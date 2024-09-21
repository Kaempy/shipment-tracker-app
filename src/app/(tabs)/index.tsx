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
import useFetch from '@hooks/useFetch';
import Emptylist from '@src/shared/EmptyList';
import {
  Message,
  MessageRes,
  ShipmentDetails,
  ShipmentRes,
} from '@src/types/base';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(true);
  const sheetRef = useRef<BottomSheetModal>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<ShipmentDetails[]>([]);

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  useEffect(() => {
    if (user) setVisible(false);
  }, [user]);
  const { loading, fetchData } = useFetch();
  const [filterOptions, setFilterOptions] = useState<Message[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  // Fetch Awb shipments
  const fetchAwbShipments = useCallback(
    async (option = {}) => {
      if (!user) return;
      const res = await fetchData<ShipmentRes>(
        `${process.env.EXPO_PUBLIC_API_URL}/frappe.client.get_list`,
        {
          method: 'POST',
          body: JSON.stringify({
            doctype: 'AWB',
            fields: ['*'],
            filters: option,
          }),
        }
      );
      res ? setData(res.message) : setData([]);
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
    let isMounted = true;
    const fetchAwbStatus = async (): Promise<void> => {
      const formData = new FormData();
      formData.append('doctype', 'AWB Status');
      formData.append('fields', JSON.stringify(['name', 'status', 'color']));
      const res = await fetchData<MessageRes>(
        `${process.env.EXPO_PUBLIC_API_URL}/frappe.client.get_list`,
        { method: 'POST', body: formData }
      );
      res ? setFilterOptions(res.message) : setFilterOptions([]);
    };
    fetchAwbStatus();
    return () => {
      isMounted = false;
    };
  }, []);

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
            />

            {/* FlatList for displaying shipment items */}
            <FlatList
              data={data}
              keyExtractor={({ name }) => name}
              renderItem={({ item }) => (
                <ShipmentItem item={item} data={filterOptions} />
              )}
              ListEmptyComponent={
                <Emptylist
                  title="No items found!"
                  subTitle="No shipment item available."
                />
              }
              contentContainerStyle={{ marginBottom: 50 }}
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
