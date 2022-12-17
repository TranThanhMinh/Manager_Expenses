import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native"
import { Color } from "../../common";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addNewBook,GetFloodReports } from "../../redux/reducer";
import style from "./style";

const Home = () => {
    const {bookList,flood_reports} = useAppSelector((state) => state.book);
    
    const dispatch = useAppDispatch();
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(()=>{
        dispatch(GetFloodReports(null))
        console.log(flood_reports, bookList)
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
        dispatch(addNewBook({ id, title, author }))
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
            <FlatList
                data={bookList}
                renderItem={itemBook} />
        </View>
    )
}

export default Home;