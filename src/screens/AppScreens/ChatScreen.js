import React, { useEffect, useState, useRef } from 'react'
import { View, TouchableOpacity, Text, useColorScheme, ActionSheetIOS, Clipboard, FlatList } from 'react-native';
import { setDoc, doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import { GiftedChat, Bubble, Send, MessageText } from 'react-native-gifted-chat';
import { useSelector } from "react-redux";
import { InputToolbar } from 'react-native-gifted-chat';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
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

    const [replyMsg, setReplyMsg] = React.useState({
        replyId: null,
        text: '',
        user: null,
    });

    useEffect(() => {
        //real time update
        return onSnapshot(colRef, (snapshot) => {
            setMessages(snapshot.data()?.messages ?? [])
            if (!(snapshot.data()?.messages[0]?.received))
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

    const chatListRef = useRef(null);

    const scrollToMessage = (replyId) => {
        const messageIndex = messages.findIndex(
            (message) => message._id == replyId
        );

        console.log(chatListRef)
        // Scroll to the message
        chatListRef.current._messageContainerRef.current?.scrollToIndex({ index: messageIndex, animated: true });
    };

    const onSend = (newMessage = []) => {
        setReplyMsg({
            replyId: null,
            text: '',
            user: null,
        })
        const message = [{
            _id: newMessage[0]._id,
            createdAt: newMessage[0].createdAt,
            text: newMessage[0].text,
            sent: true,
            received: false,
            user: {
                _id: newMessage[0].user._id,
                name: newMessage[0].user.name
            },
            reply: replyMsg.text ? replyMsg : null
        }]
        setDoc(colRef,
            {
                messages: GiftedChat.append(messages, message),
                visible: [userInfo.email, user.email]
            },
            { merge: true }
        );
        chatListRef.current._messageContainerRef.current?.scrollToIndex({ index: 0, animated: true });

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
                onLongPress={handleBubbleLongPress}
            />
        );
    }

    function handleBubbleLongPress(context, message) {
        ActionSheetIOS.showActionSheetWithOptions({
            options: ['Reply', 'Copy Text', 'Cancel'],
            cancelButtonIndex: 2,
        }, (buttonIndex) => {
            if (buttonIndex === 0) {
                setReplyMsg({
                    replyId: message._id,
                    text: message.text,
                    user: message.user.name,
                })
            } else if (buttonIndex === 1) {
                Clipboard.setString(message.text);
            }
        });
    }

    function renderInputToolbar(props) {
        return (
            <View style={{}}>
                {
                    replyMsg.text && (
                        <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, height: 50 }}>
                            <View style={{ height: 50, width: 6, backgroundColor: colors.primary, marginRight: 7 }} />
                            <View>
                                <Text style={{ fontWeight: "700", color: colors.primary, paddingBottom: 3 }}>{replyMsg.user}</Text>
                                <Text style={{ color: colors.textPrimary }}>{replyMsg.text}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setReplyMsg({
                                    replyId: null,
                                    text: '',
                                    user: null,
                                })}
                                style={{ position: "absolute", right: 5 }}
                            >
                                <AntDesign name="closecircleo" size={24} color={colors.textPrimary} />
                            </TouchableOpacity>
                        </View>
                    )
                }
                <View style={{ position: "relative", width: "100%", height: 60, backgroundColor: colors.lightGray }}>
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            position: "absolute",
                            color: "#fff",
                            backgroundColor: colors.lightGray,
                            height: 38,
                            borderTopWidth: 0,
                            marginHorizontal: 10,
                            marginBottom: 11,
                            width: inputText ? "85%" : "74%",
                        }}
                        textInputProps={{
                            color: colors.textPrimary
                        }}
                        accessoryStyle={{ height: 'auto' }}
                    />
                    {!inputText &&
                        <>
                            <TouchableOpacity>
                                <FontAwesome style={{ position: "absolute", right: 15, top: 20 }} name="microphone" size={24} color={colors.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome style={{ position: "absolute", right: 50, top: 20 }} name="camera" size={24} color={colors.secondary} />
                            </TouchableOpacity>
                        </>
                    }
                </View>
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

    const renderMessageText = (props) => {
        if (props.currentMessage.reply) {
            return <CustomMessageText {...props} />;
        }
        return <MessageText {...props} />;
    };

    const CustomMessageText = (props) => {
        return (
            <>
                <TouchableOpacity onPress={() => scrollToMessage(props.currentMessage?.reply?.replyId)} style={{ padding: 5 }}>
                    <View
                        style={{
                            backgroundColor: props.currentMessage.user._id == userInfo.email
                                ? scheme === 'dark' ? '#72bcd4' : '#003399'
                                : scheme === 'dark' ? '#5A5A5A' : colors.lightGray,
                            borderRadius: 10
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{
                                    height: '100%',
                                    width: 10,
                                    backgroundColor: props.currentMessage.user._id == userInfo.email ? colors.primary : '#00468A',
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                }}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Text
                                    style={{
                                        color: props.currentMessage.user._id == userInfo.email ? colors.primary : colors.secondary,
                                        paddingHorizontal: 10,
                                        paddingTop: 5,
                                        fontWeight: '700',
                                    }}>
                                    {props.currentMessage?.reply?.user}
                                </Text>
                                <Text
                                    style={{
                                        color: props.currentMessage.user._id == userInfo.email ? 'white' : colors.textPrimary,
                                        paddingHorizontal: 10,
                                        paddingTop: 5,
                                        marginBottom: 5,
                                    }}>
                                    {props.currentMessage?.reply?.text}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <MessageText {...props} />
            </>
        );
    };

    return (
        <View style={{ paddingBottom: Platform.OS === 'android' ? (replyMsg.text ? 65 : 15) : (replyMsg.text ? 75 : 25), height: "100%", backgroundColor: scheme === 'dark' ? colors.backgroundSecondary : colors.background }}>
            <GiftedChat
                messages={messages.map(x => ({ ...x, createdAt: x?.createdAt?.toDate() }))}
                ref = {(list) => chatListRef.current = list}
                onSend={messages => onSend(messages)}
                renderAvatar={null}
                bottomOffset={Platform.OS === 'android' ? 0 : 10}
                user={{
                    _id: userInfo.email,
                    name: userInfo.name
                }}
                renderMessageText={renderMessageText}
                renderInputToolbar={(props) => renderInputToolbar(props)}
                renderSend={renderSend}
                renderBubble={renderBubble}
                text={inputText}
                onInputTextChanged={setInputText}
                wrapInSafeArea={false}
                keyboardShouldPersistTaps='handled'
            />
        </View>
    )
}

export default ChatScreen