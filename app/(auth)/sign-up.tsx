import React, {useState} from 'react';
import {Alert, Text, View} from "react-native";
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({name: '', email:'', password:''})

    const submit = async () => {
        const {name, email, password} = form
        if(!name || !email || !password) return Alert.alert('Error', 'Please enter valid email and password.')

        setIsSubmitting(true)

        try {
            await createUser({email, password, name})

            Alert.alert('Success', 'User signed up successfully.')
            router.replace('/')
        }catch (error:any){
            Alert.alert('Error', error.message)
        }finally {
            setIsSubmitting(false)
        }
    }
    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                label="Full Name"
                placeholder="Enter your full name"
                value={form.name}
                onChangeText={(text: string) => setForm((prev)=>({...prev, name:text}))}
            />
            <CustomInput
                label="Email"
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text: string) => setForm((prev)=>({...prev, email:text}))}
                keyboardType="email-address"
            />
            <CustomInput
                label="Password"
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text: string) => setForm((prev)=>({...prev, password:text}))}
                secureTextEntry={true}
            />
            <CustomButton
                title="Sign Up"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    Already have an account?
                </Text>
                <Link href="/sign-in" className="base-bold text-primary">
                    Sign In
                </Link>
            </View>
        </View>
    );
};

export default SignUp;
