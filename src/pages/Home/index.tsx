import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native"
import { Color } from "../../common";
import * as ActionTypes from '../../redux/actions/ActionTypes'
import { useSelector, useDispatch } from "react-redux";
// import { addNewBook,GetFloodReports } from "../../redux/reducer";
import style from "./style";
import { useTypedSelector } from '../../hooks/useTypeSelector';

import { getFloodReports } from "../../redux/actions/danang";
const Home = () => {
  //  const {bookList,flood_reports} = useAppSelector((state) => state.book);
  const { comments, loading, error } = useTypedSelector((state) => state.comments);
    const dispatch = useDispatch();
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(()=>{
         dispatch(getFloodReports());
    },[])

    const itemBook = ({ item }) => {
        const { author, title } = item
        return (
            <View>
                <Text>{title} {author}</Text>
            </View>
        )
    }

    const handleAddBook = () => {
      //  dispatch(addNewBook({ id, title, author }))
    }

    const addBook = () => {
        return (
            <View style={{ width: '100%' }}>
                <TextInput style={style.textInput} value={id} placeholder="Nhâp id"  onChangeText={(text)=>setId(text)}/>
                <TextInput style={style.textInput} value={title} placeholder="Nhâp title" onChangeText={(text)=>setTitle(text)}/>
                <TextInput style={style.textInput} value={author} placeholder="Nhâp author" onChangeText={(text)=>setAuthor(text)}/>
                <TouchableOpacity style={style.button} onPress={handleAddBook}>
                    <Text>Thêm book</Text>
                </TouchableOpacity>
            </View>
        )
    }
  

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white, marginHorizontal: 5 }}>
            {addBook()}
            {/* <FlatList
                data={bookList}
                renderItem={itemBook} /> */}
        </View>
    )
}

export default Home;