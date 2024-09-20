import { Button } from '@components/ui/button';
import { Text } from '@components/ui/text';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Loader2 } from '@lib/icons/Loader2';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert, View } from 'react-native';
type Message = {
  name: string;
  status: string;
  color: string;
};

const FilterSheet = forwardRef<BottomSheetModal, {}>((props, ref) => {
  const snapPoints = useMemo(() => ['33%'], []);
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<Message[]>([]);
  useEffect(() => {
    let isMounted = true;
    const fetchAwbStatus = async (): Promise<void> => {
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
              doctype: 'AWB Status',
              fields: ['name', 'status', 'color'],
            }),
          }
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const result = await res.json();
        setFilterOptions(result.message);
      } catch (error) {
        if (error instanceof Error) Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAwbStatus();
    return () => {
      isMounted = false;
    };
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const handleFilterClose = () => {
    (ref as React.RefObject<BottomSheetModal>).current?.close();
  };

  const onFilter = () => {};

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const getSelectedFilter = (key: string) => {
    return selectedFilter === key;
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>
        <View className="flex-row items-center justify-between gap-3">
          <Button variant="link" onPress={handleFilterClose}>
            <Text className="text-base font-medium">Cancel</Text>
          </Button>
          <Text className="text-lg font-semibold">Filters</Text>
          <Button variant="link" onPress={onFilter}>
            <Text className="text-base font-medium">Done</Text>
          </Button>
        </View>
        <View className="h-1 border-b border-[#EAE7F2]" />
        <View className="m-6">
          <Text className="text-sm font-medium uppercase text-[#58536E]">
            Shipment Status
          </Text>
          <View className="mt-4 flex-row flex-wrap gap-4">
            {loading ? (
              <Loader2 />
            ) : (
              filterOptions?.map((item) => (
                <Button
                  variant="secondary"
                  key={item.name}
                  className={`border-[1.5px] ${
                    getSelectedFilter(item.name)
                      ? 'border-[#6E91EC]'
                      : 'border-transparent'
                  } bg-[#F4F2F8]`}
                  onPress={() => setSelectedFilter(item.name)}
                >
                  <Text
                    className={`text-[#58536E] ${getSelectedFilter(item.name) ? 'text-[#2F50C1]' : ''}`}
                  >
                    {item.status}
                  </Text>
                </Button>
              ))
            )}
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default FilterSheet;
