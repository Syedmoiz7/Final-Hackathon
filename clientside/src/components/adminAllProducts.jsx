import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import moment from 'moment/moment';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import './adminAllProducts.css'
import { GlobalContext } from '../context/Context';
import InfiniteScroll from 'react-infinite-scroller';
import Ellipse from './Images/Ellipse 4.png'

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';



import { HiOutlineGif } from 'react-icons/hi2'
import { CgImage } from 'react-icons/cg'
import { BiPoll, BiSmile } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {fa-solid fa-reply } from '@fortawesome/react-fontawesome'
// import { fa-solid fa-retweet} from '@fortawesome/react-fontawesome'
// import {fa solid fa-heart } from '@fortawesome/react-fontawesome'


function AllProducts() {

    let { state, dispatch } = useContext(GlobalContext);

    const [products, setProducts] = useState([]);
    const [loadTweet, setLoadTweet] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editingTweet, setEditingTweet] = useState(null)
    const [preview, setPreview] = useState(null)
    const [eof, setEof] = useState(false)

    const getAllProducts = async () => {

        if (eof) return

        try {
            const response = await axios.get(`${state.baseUrl}/productFeed?page=${products.length}`)
            console.log("response: ", response.data);

            if (response.data.data.length === 0) setEof(true)

            setProducts((prev) => {

                // if (prev.length >= 10) {
                //     prev = prev.slice(5)
                // }
                return [...prev, ...response.data.data]
            })

        } catch (error) {
            console.log("error in getting products ", error);
        }
    }

    const deleteTweet = async (id) => {
        try {
            const response = await axios.delete(`${state.baseUrl}/tweet/${id}`)
            console.log("response: ", response.data);
            setLoadTweet(!loadTweet)

        } catch (error) {
            console.log("error in deleting products ", error);
        }
    }

    const editMode = (tweet) => {
        setIsEditMode(!isEditMode)
        setEditingTweet(tweet)

        editFormik.setFieldValue("tweetName", tweet.name)
        editFormik.setFieldValue("tweetPrice", tweet.price)
        editFormik.setFieldValue("tweetDescription", tweet.description)
    }

    useEffect(() => {
        getAllProducts()
    }, [loadTweet])

    let baseUrl = "";
    if (window.location.href.split(":")[0] === "http") {
        baseUrl = "http://localhost:5000";
    }

    const tweetValidationSchema = yup.object({
        tweetText: yup
            .string('Enter your tweet text')
            .required('tweet text is required')
            .min(3, "please enter more then 3 characters ")
            .max(140, "please enter within 140 characters ")
    })

    const myFormik = useFormik({
        initialValues: {
            tweetText: ''
        },
        validationSchema: tweetValidationSchema,
        onSubmit: (values) => {
            console.log("values: ", values);

            let fileInput = document.getElementById("picture");
            console.log("fileInput: ", fileInput.files[0]);

            let formData = new FormData();

            formData.append("myFile", fileInput.files[0])
            formData.append("text", values.tweetText)

            axios({
                method: 'post',
                url: `${state.baseUrl}/tweet`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(res => {
                    setLoadTweet(!loadTweet)
                    console.log("upload success: ", res.data);
                })
                .catch(err => {
                    console.log("error:", err);
                })
        },
    });

    const editFormik = useFormik({
        initialValues: {
            tweetText: ''
        },
        validationSchema: tweetValidationSchema,
        onSubmit: (values) => {
            console.log("values: ", values);

            axios.put(`${state.baseUrl}/tweet/${editingTweet._id}`, {
                text: values.tweetText
            })
                .then(response => {
                    console.log("response: ", response.data);
                    setLoadTweet(!loadTweet)
                })
                .catch(err => {
                    console.log("error: ", err);
                })
        },
    });

    return (
        <div className='main'>

            <div className="admin">

                <div className="headerr">
                    <div className="ellipse">
                        <img src={Ellipse} alt="" />
                    </div>

                    <div className="AllProducts">
                        <h2>Mr. Ahmed</h2>

                        <h3 className='adminHeading'>Admin</h3>
                    </div>

                    <div className="cartIcon">
                    </div>
                </div>

                <div className='grocery'>
                </div>

                <div className="footer">
                    <HomeIcon className="iconss" fontSize="large" />
                    <ShoppingCartIcon className="iconss" fontSize="large" />
                    <PersonIcon className="iconss" fontSize="large" />


                </div>

            </div>

        </div>
    )
}

export default AllProducts;