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
import { ShipmentDetails } from '@src/types/base';
import { StatusBar } from 'expo-status-bar';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const [data, setData] = useState<ShipmentDetails[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  useEffect(() => {
    if (user) setVisible(false);
  }, [user]);

  // Fetch Awb shipments
  const fetchAwbShipments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://shippex-demo.bc.brandimic.com/api/method/frappe.client.get_list',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doctype: 'AWB',
            fields: ['*'],
            filters: {},
          }),
        }
      );
      if (!res.ok) throw new Error('Failed to fetch');
      const result = await res.json();
      setData(result.message);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAwbShipments();
  }, [fetchAwbShipments]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAwbShipments();
    setRefreshing(false);
  }, [fetchAwbShipments]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <Fragment>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
            <View className="h-full flex-1 px-4">
              <ListHeader showFilterModal={handleSnapPress} />

              {/* FlatList for displaying shipment items */}
              <FlatList
                data={data}
                keyExtractor={({ name }) => name}
                renderItem={({ item }) => (
                  <View className="gap-3">
                    <ShipmentItem item={item} />
                  </View>
                )}
                ListEmptyComponent={
                  <Emptylist
                    title="No items found!"
                    subTitle="No shipments item available."
                  />
                }
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            </View>
          )}
        </SafeAreaView>
        <BottomSheetModalProvider>
          <FilterSheet ref={sheetRef} />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
  },
});

export default HomeScreen;
