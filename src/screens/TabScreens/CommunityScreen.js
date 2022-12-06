import { TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//Components
import UserListItem from '../../components/UserListItem';
import SearchBox from '../../components/SearchBox';
import TabBarScreenWrap from '../../components/TabBarScreenWrap';
import TabBarPageTitle from '../../components/TabBarPageTitle';

const CommunityScreen = () => {

  return (
    <TabBarScreenWrap>
      <TabBarPageTitle title="Community" />
      <KeyboardAwareScrollView style={{ height: "97.7%" }} keyboardShouldPersistTaps='handled'>
        <SearchBox />
        <TouchableOpacity>
          <UserListItem
            userImg="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            userName="Yusuf"
            userDetail="hiiiiii"
            speaks=""
            learns=""
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <UserListItem
            userImg="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            userName="Yusuf"
            userDetail="hiiiiii"
            speaks=""
            learns=""
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <UserListItem
            userImg="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            userName="Yusuf"
            userDetail="hiiiiii"
            speaks=""
            learns=""
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <UserListItem
            userImg="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            userName="Yusuf"
            userDetail="hiiiiii"
            speaks=""
            learns=""
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <UserListItem
            userImg="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            userName="Yusuf"
            userDetail="hiiiiii"
            speaks=""
            learns=""
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <UserListItem
            userImg="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            userName="Yusuf"
            userDetail="hiiiiii"
            speaks=""
            learns=""
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <UserListItem
            userImg="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            userName="Yusuf"
            userDetail="hiiiiii"
            speaks=""
            learns=""
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <UserListItem
            userImg="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            userName="Yusuf"
            userDetail="hiiiiii"
            speaks=""
            learns=""
          />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </TabBarScreenWrap>
  )
}

export default CommunityScreen