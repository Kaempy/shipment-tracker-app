import { usePathname } from 'expo-router';
import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

const SearchInput = ({
  initialQuery,
  placeholder,
}: {
  initialQuery?: string;
  placeholder: string;
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');
  return (
    <View className="w-full flex-row items-center gap-4 rounded-xl bg-[#F4F2F8] p-4 focus:border-secondary">
      <TouchableOpacity
      // onPress={() => {
      //   if (!query) {
      //     return Alert.alert(
      //       'Missing search query',
      //       'Please enter a search text to query on database'
      //     );
      //   }
      //   if (pathname.startsWith('/search')) {
      //     router.setParams({ query });
      //   } else {
      //     router.push(`/search/${query}`);
      //   }
      // }}
      >
        <Search color="#A7A3B3" />
      </TouchableOpacity>
      <TextInput
        className="w-full text-black"
        placeholder={placeholder}
        placeholderTextColor="#A7A3B3"
        value={query}
        onChangeText={setQuery}
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
};

export default SearchInput;
