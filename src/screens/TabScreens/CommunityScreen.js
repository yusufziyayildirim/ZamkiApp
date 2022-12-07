import { TouchableOpacity, RefreshControl, FlatList, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useTheme } from '@react-navigation/native';

//Components
import UserListItem from '../../components/UserListItem';
import SearchBox from '../../components/SearchBox';
import TabBarScreenWrap from '../../components/TabBarScreenWrap';
import TabBarPageTitle from '../../components/TabBarPageTitle';
import UserService from '../../services/UserService';
import SkeletonLoader from '../../components/SkeletonLoader';

const CommunityScreen = () => {
  const colors = useTheme().colors;

  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const [users, setUsers] = useState([]);
  const [filtredUsers, setFiltredUsers] = useState(null);

  const [refreshing, setRefreshing] = useState(false)

  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    lazyLoadUser()
  }, [])

  useEffect(() => {
    searchUser()
  }, [debouncedSearch])

  const getAllUserFromService = async (pageNum) => {
    const response = await UserService.getAllUser(pageNum)
    if (response.data.data.last_page != lastPage) {
      setLastPage(response.data.data.last_page)
    }
    if (pageNum == 1) {
      setUsers(response.data.data.data)
    } else {
      setUsers(users.concat(response.data.data.data))
    }
    setCurrentPage(pageNum + 1)
  }

  const lazyLoadUser = async () => {
    if (currentPage <= lastPage) {
      getAllUserFromService(currentPage)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllUserFromService(1)
    setRefreshing(false);
  }

  const searchUser = async () => {
    setRefreshing(true)
    if (debouncedSearch?.length > 0) {
      const response = await UserService.getUser(search)
      if (response.data.data == null) {
        setFiltredUsers([])
      } else {
        setFiltredUsers(response.data.data)
      }
    } else {
      setFiltredUsers(null)
    }
    setRefreshing(false)
  }

  return (
    <TabBarScreenWrap>
      <TabBarPageTitle title="Community" />
      <SearchBox search={search} setSearch={setSearch} />
      {//Works after some users get
        users?.length > 0 ? (
          //List result if filtered users, if not, list all users with lazy loading
          <FlatList
            style={{ height: "89.5%", flexGrow: 0 }}
            data={filtredUsers == null ? users : filtredUsers}
            renderItem={({ item }) =>
              <TouchableOpacity>
                {item && (
                  <UserListItem
                    user={item}
                  />
                )}
              </TouchableOpacity>
            }
            keyExtractor={(item) => item?.email}
            onEndReached={lazyLoadUser}
            onEndReachedThreshold={0.9}
            keyboardShouldPersistTaps='handled'
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={{ height: "100%", alignItems: "center" }}>
                <Text style={{ textAlign: "center", marginTop: 20, width: "60%", fontWeight: "600", color: colors.textPrimary }}>
                  The user you are looking for was not found
                </Text>
              </View>
            }
          />
        ) : (
          //Skeleton user loading when getAllUser working
          [1, 2, 3, 4, 5].map((key) => {
            return (
              <View
                key={key}
                style={{
                  width: "80%",
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  marginTop: 15,
                  height: 100,
                  alignItems: "center",
                  paddingTop: 15,
                }}
              >
                <SkeletonLoader w={90} h={90} rd={15} />
                <View
                  style={{
                    width: "100%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    height: 85,
                    justifyContent: "space-between"
                  }}
                >
                  <SkeletonLoader w={140} h={20} />
                  <SkeletonLoader w={240} h={20} />
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <SkeletonLoader w={110} h={20} />
                    <SkeletonLoader w={110} h={20} />
                  </View>
                </View>
              </View>
            )
          })
        )
      }
    </TabBarScreenWrap>
  )
}

export default CommunityScreen