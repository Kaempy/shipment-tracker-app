import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Text } from '@components/ui/text';
import { useAuth } from '@context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from '@lib/icons/Loader2';
import { loginSchema, loginType } from '@src/validation/login';
import { router } from 'expo-router';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const SigninModal = ({ visible, setVisible }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const onSubmit = async ({ email, password }: loginType) => {
    const formData = new FormData();
    formData.append('usr', email);
    formData.append('pwd', password);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw Error('Invalid credentials');
        }
        throw Error(`Oppsss... an error occured. \nStatus code: ${res.status}`);
      }
      const response = await res.json();
      if (response) {
        login(response);
        setVisible(false);
        Alert.alert(
          'Success',
          `${response.message || 'Logged in'} successfully!`
        );
      } else {
        throw new Error('Failed to log in. No response data.');
      }
    } catch (error) {
      if (error instanceof Error) Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const onClose = () => {
    if (router.canGoBack()) router.back();
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={visible}
      onRequestClose={onClose}
      onDismiss={onClose}
    >
      <ScrollView>
        <View className="px-6 py-8">
          <Pressable className="mb-6 flex-row gap-1" onPress={onClose}>
            <ChevronLeft color="#4561DB" size={24} />
            <Text className="text-xl font-normal leading-[22px] tracking-[-0.4px] text-[#4561DB]">
              Cancel
            </Text>
          </Pressable>
          <View>
            <Text className="text-4xl font-semibold text-[#1A1A1A]">Login</Text>
            <Text className="text-base text-[#757281]">
              Please enter your First, Last name and your phone number inorder
              to register
            </Text>
          </View>
          <View className="mt-8 justify-between gap-12">
            <View className="gap-8">
              <View>
                <Text className="mb-1 ml-1 font-500 text-sm text-[#333]">
                  Username / Email
                </Text>
                <Input
                  {...register('email')}
                  onChangeText={(text) => setValue('email', text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                />
                {errors.email && (
                  <Text className="text-xs text-red-600">
                    {errors.email.message}
                  </Text>
                )}
              </View>
              <View>
                <Text className="mb-1 ml-1 font-500 text-sm text-[#333]">
                  Password
                </Text>
                <View className="relative h-12 w-full flex-row items-center justify-between rounded-lg bg-[#F4F2F880] px-3">
                  <TextInput
                    {...register('password')}
                    onChangeText={(text) => setValue('password', text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                    secureTextEntry={!showPassword}
                    className="h-10 w-[90%] !py-0"
                  />
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4"
                  >
                    {showPassword ? (
                      <EyeOff size={20} strokeWidth={1.75} color="#666" />
                    ) : (
                      <Eye size={20} strokeWidth={1.75} color="#666" />
                    )}
                  </Pressable>
                </View>
                {errors.password && (
                  <Text className="text-xs text-red-600">
                    {errors.password.message}
                  </Text>
                )}
              </View>
            </View>
            <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin" color="white" />
              ) : (
                <Text className="font-600 text-base text-white">Login</Text>
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default SigninModal;
