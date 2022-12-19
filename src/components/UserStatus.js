import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from '../constants/firebaseConfig';

const UserStatus = ({ email, size, withText = false }) => {
    const statusRef = query(collection(db, "online"), where('email', '==', email))
    const [status, setStaus] = useState(false);

    useEffect(() => {
        return onSnapshot(statusRef, (snapshot) => {
            snapshot.docs.length > 0
                ? setStaus(true)
                : setStaus(false)
        })
    }, [])

    return (
        status
            ? (
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: size, height: size, backgroundColor: "green", borderRadius: 50 }} />
                    {withText &&
                        <Text style={{ paddingLeft: 5, paddingTop: 2, color: "#fff", fontWeight: "700" }}>Online</Text>
                    }
                </View>
            ) : (
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: size, height: size, backgroundColor: "gray", borderRadius: 50 }} />
                    {withText &&
                        <Text style={{ paddingLeft: 5, paddingTop: 2, color: "#fff", fontWeight: "700" }}>Offline</Text>
                    }
                </View>
            )
    )
}

export default UserStatus