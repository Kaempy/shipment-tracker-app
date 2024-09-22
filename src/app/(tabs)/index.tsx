/* eslint-disable  @typescript-eslint/no-unused-vars */

import FilterSheet from '@components/modal/FilterSheet';
import SigninModal from '@components/modal/sign-in';
import ListHeader from '@components/shipment/ListHeader';
import ShipmentItem from '@components/shipment/ShipmentItem';
import { useAuth } from '@context/AuthContext';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Emptylist from '@src/shared/EmptyList';
import { Message, ShipmentDetails } from '@src/types/base';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(true);
  const sheetRef = useRef<BottomSheetModal>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedState, setCheckedState] = useState<boolean[]>([]);
  const [data, setData] = useState<ShipmentDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<Message[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  useEffect(() => {
    if (user?.full_name) setVisible(false);
    else setVisible(true);
  }, [user]);

  // Initialize the checked state array based on data length
  useEffect(() => {
    setCheckedState(new Array(data.length).fill(false));
  }, [data]);

  // Logic to handle "Mark All" checkbox state
  const handleSelectAll = (isChecked: boolean) => {
    setAllChecked(isChecked);
    setCheckedState(new Array(data.length).fill(isChecked));
  };

  // Logic to handle individual checkboxes and reflect changes in "Mark All" checkbox
  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? isChecked : item
    );
    setCheckedState(updatedCheckedState);

    const allSelected = updatedCheckedState.every(Boolean);
    const someSelected = updatedCheckedState.some(Boolean);

    setAllChecked(allSelected || someSelected);
  };

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  // Fetch Awb shipments
  const fetchAwbShipments = useCallback(
    async (option = {}) => {
      if (!user) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/frappe.client.get_list`,
          {
            method: 'POST',
            body: JSON.stringify({
              doctype: 'AWB',
              fields: ['*'],
              filters: option,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!res.ok) {
          if (res.status === 401) {
            throw Error('Invalid credentials');
          }
          throw Error(
            `Oppsss... an error occured. \nStatus code: ${res.status}`
          );
        }
        const result = await res.json();
        result ? setData(result.message) : setData([]);
      } catch (error) {
        if (error instanceof Error) Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  useEffect(() => {
    fetchAwbShipments();
  }, [fetchAwbShipments]);
  useEffect(() => {
    if (status) fetchAwbShipments({ status: ['like', status] });
    if (search) fetchAwbShipments({ name: ['like', search] });
  }, [fetchAwbShipments, status, search]);

  useEffect(() => {
    const fetchAwbStatus = async (): Promise<void> => {
      if (!user) return;
      const formData = new FormData();
      formData.append('doctype', 'AWB Status');
      formData.append('fields', JSON.stringify(['name', 'status', 'color']));
      setStatusLoading(true);
      try {
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/frappe.client.get_list`,
          {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (!res.ok) {
          if (res.status === 401) {
            throw Error('Invalid credentials');
          }
          throw Error(
            `Oppsss... an error occured. \nStatus code: ${res.status}`
          );
        }
        const result = await res.json();
        result ? setFilterOptions(result.message) : setFilterOptions([]);
      } catch (error) {
        if (error instanceof Error) Alert.alert('Error', error.message);
      } finally {
        setStatusLoading(false);
      }
    };
    fetchAwbStatus();
  }, [user]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAwbShipments();
    setRefreshing(false);
  }, [fetchAwbShipments]);

  if (loading) {
    return <ActivityIndicator color="#2F50C1" className="flex-1" />;
  }
  return (
    <GestureHandlerRootView className="flex-1">
      <StatusBar style="dark" />
      <SafeAreaView
        style={[
          styles.rootContainer,
          { backgroundColor: visible ? '#2F50C1' : '#ffffff' },
        ]}
      >
        {visible ? (
          <SigninModal visible={visible} setVisible={setVisible} />
        ) : (
          <View className="px-4 py-8">
            <ListHeader
              showFilterModal={handleSnapPress}
              addSearch={setSearch}
              selectAllChecked={handleSelectAll}
              allChecked={allChecked}
            />

            {/* FlatList for displaying shipment items */}
            <FlatList
              data={data}
              keyExtractor={({ name }) => name}
              renderItem={({ item, index }) => (
                <ShipmentItem
                  item={item}
                  data={filterOptions}
                  checked={checkedState[index]}
                  onCheckedChange={(isChecked: boolean) =>
                    handleCheckboxChange(index, isChecked)
                  }
                />
              )}
              ListEmptyComponent={
                <Emptylist
                  title="No items found!"
                  subTitle="No shipment item available."
                />
              }
              contentContainerStyle={{ paddingBottom: 220 }}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </View>
        )}
      </SafeAreaView>
      <BottomSheetModalProvider>
        <FilterSheet
          ref={sheetRef}
          data={filterOptions}
          addFilter={setStatus}
          loading={statusLoading}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
  },
});

export default HomeScreen;
