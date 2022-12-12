import { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';

//Components
import SearchBox from '../../components/SearchBox'
import ChatListItem from '../../components/ChatListItem';
import TabBarScreenWrap from '../../components/TabBarScreenWrap';
import TabBarPageTitle from '../../components/TabBarPageTitle';

const ChatListScreen = () => {
    const [search, setSearch] = useState("");

    return (
        <TabBarScreenWrap>
            <TabBarPageTitle title="Messages" />
            <ScrollView style={{ height: "97.5%" }} keyboardShouldPersistTaps='handled'>
                <SearchBox search={search} setSearch={setSearch} />
                <View>
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <ChatListItem
                            userImg=""
                            userName={"Yusuf Ziya"}
                            userMessage={"Deneme mesajı"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <ChatListItem
                            userImg=""
                            userName={"Yusuf Ziya"}
                            userMessage={"Deneme mesajı"}
                            countNewMessage={3}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </TabBarScreenWrap>
    )
}

export default ChatListScreen