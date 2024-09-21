import { Search } from 'lucide-react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Alert, Pressable, TextInput, View } from 'react-native';

type Props = {
  placeholder: string;
  onSearch: Dispatch<SetStateAction<string | null>>;
};

const SearchInput = ({ placeholder, onSearch }: Props) => {
  const [query, setQuery] = useState('');
  const handleSerch = () => {
    if (!query) return Alert.alert('Info', 'Please enter a search term');
    onSearch(query);
  };
  return (
    <View className="w-full flex-row items-center gap-4 rounded-xl bg-[#F4F2F8] px-4 py-2 focus:border-secondary">
      <Pressable onPress={handleSerch}>
        <Search color="#A7A3B3" />
      </Pressable>
      <TextInput
        className="w-[90%] text-primary"
        placeholder={placeholder}
        placeholderTextColor="#A7A3B3"
        value={query}
        onChangeText={setQuery}
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default SearchInput;
