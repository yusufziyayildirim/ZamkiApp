import { View, TouchableOpacity, Text, FlatList, Modal } from 'react-native';
import { collection, onSnapshot, where, query, updateDoc, doc, arrayRemove, } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import UserService from '../../services/UserService';

import { db } from '../../constants/firebaseConfig';

//Components
import SearchBox from '../../components/SearchBox'
import ChatListItem from '../../components/ChatListItem';
import TabBarScreenWrap from '../../components/TabBarScreenWrap';
import TabBarPageTitle from '../../components/TabBarPageTitle';
import SkeletonLoader from '../../components/SkeletonLoader';
import ActionButton from '../../components/ActionButton';

const ChatListScreen = ({ navigation }) => {
    const colors = useTheme().colors;

    const [search, setSearch] = useState("");
    const [chats, setChats] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [filteredChat, setFilteredChat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [longPress, setLongpress] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)

    const { userInfo } = useSelector(state => state.auth);
    const colRef = query(collection(db, "chats"), where('users', 'array-contains', userInfo.email))
    useEffect(() => {
        setIsLoading(true)
        return onSnapshot(colRef, (snapshot) => {
            let promiseArray = [];
            //Son mesajı üstte sıralama
            setChats(snapshot.docs.sort((a, b) => b.data().messages[0]?.createdAt?.toDate() - a.data().messages[0]?.createdAt?.toDate()))
            //Sohbet edilen kullanıcıların bilgilerini getirme
            snapshot.docs.map((item) => {
                if (item.data().messages[0])
                    var prms = getChatsUsers(item.data().users.find(x => x != userInfo.email))
                promiseArray.push(prms)
            })

            Promise.all(promiseArray).then(() => {
                setIsLoading(false)
            });
        })
    }, [])

    const getChatsUsers = async (email) => {
        if (usersData.length == 0 || usersData?.find(item => item.email != email)) {
            try {
                const res = await UserService.getUser(email)
                setUsersData((prevState) => [...prevState, res.data.data]);
            } catch (error) {
                console.log(error)
            }
        }
    }

    const openChat = async (email, chatId) => {
        const user = usersData.find(item => item.email == email)
        navigation.navigate('Chat', { chatId: chatId, user: user })
    }

    const countNewMessage = (messages) => {
        const unReadMessages = messages.filter(message => message.user._id != userInfo.email && message.received == false);
        return unReadMessages.length
    }

    useEffect(() => {
        search.length > 0
            ? searchChat(search)
            : setFilteredChat(null)
    }, [search])

    const searchChat = (search) => {
        let filteredUsers = chats.filter(item => {
            return (
                item.data().messages[0] &&
                usersData.find(otherUser => otherUser.email == item.data().users.find(x => x != userInfo.email))?.name.toLowerCase().includes(search.toLowerCase())
            )
        });
        setFilteredChat(filteredUsers)
    }

    const handleSelectItem = (item) => {
        setLongpress(true)
        selectedItem.includes(item)
            ? setSelectedItem(selectedItem.filter((id) => id != item))
            : setSelectedItem([...selectedItem, item])
    }

    const deleteChat = () => {
        selectedItem.map(id => {
            updateDoc(doc(db, "chats", id), {
                visible: arrayRemove(userInfo.email)
            });
        })
        setLongpress(false)
        setDeleteModal(false)
    }

    return (
        <TabBarScreenWrap>
            <TabBarPageTitle title="Messages" />
            <SearchBox search={search} setSearch={setSearch} />
            <View style={{ height: "89.5%", }}>
                {
                    !isLoading ? (
                        <>
                            <FlatList
                                style={{ height: "95.5%", flexGrow: 0 }}
                                data={filteredChat == null ? chats : filteredChat}
                                renderItem={({ item }) => {
                                    if (item.data().messages[0] && item.data().visible?.includes(userInfo.email)) {
                                        let secondUserEmail = item.data().users.find(x => x != userInfo.email)
                                        return (
                                            <TouchableOpacity
                                                onPress={
                                                    () => longPress
                                                        ? handleSelectItem(item.id)
                                                        : openChat(secondUserEmail, item.id)
                                                }
                                                onLongPress={() => handleSelectItem(item.id)}
                                            >
                                                <ChatListItem
                                                    userImg={usersData.find(otherUser => otherUser.email == secondUserEmail)?.img}
                                                    userName={usersData.find(otherUser => otherUser.email == secondUserEmail)?.name}
                                                    userEmail={usersData.find(otherUser => otherUser.email == secondUserEmail)?.email}
                                                    lastMessage={item.data().messages[0]}
                                                    countNewMessage={countNewMessage(item.data().messages)}
                                                    selected={longPress ? selectedItem.includes(item.id) : null}
                                                />
                                            </TouchableOpacity>
                                        )
                                    }
                                }}
                                ListEmptyComponent={
                                    <View style={{ height: "100%", alignItems: "center", marginTop: 10 }}>
                                        {
                                            filteredChat == null ? (
                                                <>
                                                    <FontAwesome5 name="info" size={34} color={colors.textPrimary} />
                                                    <Text style={{ textAlign: "center", marginTop: 10, width: "60%", fontWeight: "600", color: colors.textPrimary }}>
                                                        You don't have any messages. Check out community and message someone to start practicing your language skills!
                                                    </Text>
                                                </>
                                            ) : (
                                                <Text style={{ textAlign: "center", marginTop: 20, width: "60%", fontWeight: "600", color: colors.textPrimary }}>
                                                    The chat you are looking for was not found!
                                                </Text>
                                            )
                                        }
                                    </View>
                                }
                            />
                            <Modal visible={deleteModal} onRequestClose={() => setVisible(false)} animationType="fade" transparent={true} >
                                <View style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
                                    <View style={{ backgroundColor: colors.lightGray, position: "absolute", height: 130, width: "70%", borderRadius: 15, paddingVertical: 15, paddingHorizontal: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                                        <Text style={{ fontSize: 17, fontWeight: "600", color: colors.textPrimary, textAlign: "center" }}>Are you sure you want to delete {selectedItem.length} message?</Text>
                                        <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
                                            <ActionButton value="Delete" onPress={() => deleteChat()} width={115} height={40} />
                                            <ActionButton value="Cancel" onPress={() => { setDeleteModal(false); setLongpress(false); setSelectedItem([]) }} width={115} height={40} />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </>

                    ) : (
                        [1, 2, 3, 4, 5].map((key) => {
                            return (
                                <View
                                    key={key}
                                    style={{ flexDirection: "row", paddingVertical: 10, paddingHorizontal: 15 }}
                                >
                                    <SkeletonLoader w={50} h={50} rd={15} />
                                    <View
                                        style={{
                                            width: "100%",
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            height: 45,
                                            justifyContent: "space-around"
                                        }}
                                    >
                                        <SkeletonLoader w={140} h={10} />
                                        <SkeletonLoader w={240} h={10} />
                                    </View>
                                </View>
                            )
                        })
                    )
                }

            </View>
            {
                longPress && (
                    <View style={{ position: "absolute", top: 20, right: 0, width: "100%", flexDirection: "row", alignItems: "flex-end", zIndex: 100, justifyContent: "space-between", paddingHorizontal: 15 }}>
                        <TouchableOpacity onPress={() => setDeleteModal(true)}>
                            <Text style={{ color: "#fc6b68" }}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setLongpress(false); setSelectedItem([]) }}>
                            <Text style={{ color: "#00A0D2" }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </TabBarScreenWrap >
    )
}

export default ChatListScreen