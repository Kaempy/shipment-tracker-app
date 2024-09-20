import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

const SearchInput = ({
  initialQuery,
  placeholder,
}: {
  initialQuery?: string;
  placeholder: string;
}) => {
  const [query, setQuery] = useState(initialQuery || '');
  return (
    <View className="w-full flex-row items-center gap-4 rounded-xl bg-[#F4F2F8] p-4 focus:border-secondary">
      <Pressable>
        <Search color="#A7A3B3" />
      </Pressable>
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
