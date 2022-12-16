import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, useColorScheme, ActivityIndicator } from 'react-native';
import { setDoc, doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { useSelector } from "react-redux";
import { InputToolbar } from 'react-native-gifted-chat';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { db } from '../../constants/firebaseConfig';


const ChatScreen = ({ route }) => {
    let scheme = useColorScheme();
    const colors = useTheme().colors;

    const { chatId } = route.params
    const { user } = route.params
    const [messages, setMessages] = useState([])
    const { userInfo } = useSelector(state => state.auth);

    const [inputText, setInputText] = useState("")
    const colRef = doc(db, "chats", chatId)

    useEffect(() => {
        //real time update
        return onSnapshot(colRef, (snapshot) => {
            setMessages(snapshot.data()?.messages ?? [])
            if (!(snapshot.data()?.messages[0].received))
                changeIsRead()
        })
    }, [])

    const changeIsRead = async () => {
        let docChat = await getDoc(colRef);
        docChat = docChat.data()?.messages
        if (docChat) {
            docChat = docChat.map(obj => {
                if (obj.user._id != userInfo.email && !obj.received) {
                    return { ...obj, received: true };
                }

                return obj;
            });
        }
        updateDoc(colRef, {
            messages: docChat,
        });
    }

    const onSend = (newMessage = []) => {
        const message = [{
            _id: newMessage[0]._id,
            createdAt: newMessage[0].createdAt,
            text: newMessage[0].text,
            sent: true,
            received: false,
            user: {
                _id: newMessage[0].user._id,
                name: newMessage[0].user.name
            }
        }]
        setDoc(colRef,
            {
                messages: GiftedChat.append(messages, message),
                visible: [userInfo.email, user.email]
            },
            { merge: true }
        );
    }

    function renderSend(props) {
        return (
            <Send
                {...props}
                containerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 33,
                    width: 33,
                    backgroundColor: colors.primary,
                    borderRadius: 100,
                    marginBottom: 8,
                    transform: [{ translateX: 40 }]
                }}
            >
                <Ionicons name="send" size={20} color="white" />
            </Send>
        );
    }

    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                renderTicks={(props) => renderTick(props)}
                wrapperStyle={{
                    right: {
                        backgroundColor: colors.secondary,
                    },
                    left: {
                        backgroundColor: scheme === 'dark' ? '#444' : 'white'
                    },

                }}
                textStyle={{
                    left: {
                        color: colors.textPrimary,
                    }
                }}
                timeTextStyle={{
                    left: {
                        color: colors.darkGray,
                    }
                }}
            />
        );
    }

    function renderInputToolbar(props) {
        return (
            <View style={{ position: "relative", width: "100%", height: 60, backgroundColor: colors.lightGray }}>
                <InputToolbar
                    {...props}
                    containerStyle={{
                        position: "absolute",
                        backgroundColor: "white",
                        height: 38,
                        borderRadius: 20,
                        borderTopWidth: 0,
                        marginHorizontal: 10,
                        marginBottom: 11,
                        width: inputText ? "85%" : "74%",
                    }}
                />
                {!inputText &&
                    <>
                        <TouchableOpacity>
                            <FontAwesome style={{ position: "absolute", right: 15, top: 20 }} name="microphone" size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome style={{ position: "absolute", right: 50, top: 20 }} name="camera" size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                    </>
                }
            </View>
        )
    }

    const renderTick = (props) => {
        return (
            <Text style={{ marginRight: 4 }}>
                {
                    props.user._id == userInfo.email && (
                        props.received ? (
                            < Ionicons name="checkmark-done-sharp" size={18} color={colors.primary} />
                        ) : (
                            props.sent && (
                                <Ionicons name="checkmark-done-outline" size={18} color={colors.lightGray} />
                            )
                        )
                    )
                }
            </Text>
        )
    }

    return (
        <View style={{ paddingBottom: Platform.OS === 'android' ? 50 : 25, height: "100%", backgroundColor: scheme === 'dark' ? colors.backgroundSecondary : colors.background }}>
            <GiftedChat
                messages={messages.map(x => ({ ...x, createdAt: x?.createdAt?.toDate() }))}
                onSend={messages => onSend(messages)}
                renderAvatar={null}
                bottomOffset={Platform.OS === 'android' ? 0 : 10}
                user={{
                    _id: userInfo.email,
                    name: userInfo.name,
                    // avatar: "avatar"
                }}
                renderInputToolbar={(props) => renderInputToolbar(props)}
                renderSend={renderSend}
                renderBubble={renderBubble}
                text={inputText}
                onInputTextChanged={setInputText}
                wrapInSafeArea={false}
                renderLoading={() => {
                    return (
                        <ActivityIndicator size="large" color={colors.lightGray} />
                    );
                }}
            />
        </View>
    )
}

export default ChatScreen