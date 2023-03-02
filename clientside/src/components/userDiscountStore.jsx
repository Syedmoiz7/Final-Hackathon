import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import moment from 'moment/moment';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import './userDiscountStore.css'
import { GlobalContext } from '../context/Context';
import InfiniteScroll from 'react-infinite-scroller';
import Carticon from './Images/Carticon.png'
import Grocery from './Images/Grocery.png'
import Meat from './Images/Rectangle 17.png'
import Fish from './Images/Rectangle 20.png'
import Qeema from './Images/Rectangle 23.png'
import AddToCart from './Images/Rectangle 2.png'
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


function DiscountStore() {

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

            <div className="alignCenter">

                <div className="appBar">
                    <div className="discountStore">
                        <h2>SAYLANI WELFARE</h2>

                        <h5>DISCOUNT STORE</h5>

                    </div>

                    <div className="cartIcon">
                        <img src={Carticon} alt="" />
                    </div>
                </div>

                <div className="scrollable">

                    <div className='grocery'>
                        <img src={Grocery} width={400} alt="" />
                    </div>

                    <div className="pg1Products">
                        <div className="productBox">
                            <div className="meatImg">
                            <img src={Meat} alt="" />
                            </div>

                            <div className="prodDescription">
                                <div className="namePrice">
                                    <h4> Meat </h4>
                                    <h4> Rs.800-per kg </h4>
                                </div>

                                <div className="shortDescription">
                                    <p>
                                        1 kg red meat
                                    </p>

                                    <img src={AddToCart} alt="" />
                                </div>

                            </div>

                        </div>

                        <div className="productBox">
                            <div className="meatImg">
                            <img src={Fish} alt="" />
                            </div>

                            <div className="prodDescription">
                                <div className="namePrice">
                                    <h4> Fish </h4>
                                    <h4> Rs.450-per kg </h4>
                                </div>

                                <div className="shortDescription">
                                    <p>
                                        1 kg Fish
                                    </p>

                                    <img src={AddToCart} alt="" />
                                </div>

                            </div>

                        </div>

                        <div className="productBox">
                            <div className="meatImg">
                            <img src={Qeema} alt="" />
                            </div>

                            <div className="prodDescription">
                                <div className="namePrice">
                                    <h4> Beef Qeema </h4>
                                    <h4> Rs.800-per kg </h4>
                                </div>

                                <div className="shortDescription">
                                    <p>
                                        1 kg Beef Qeema
                                    </p>

                                    <img src={AddToCart} alt="" />
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="footer">
                        <HomeIcon className="iconss" fontSize="large" />
                        <ShoppingCartIcon className="iconss" fontSize="large" />
                        <PersonIcon className="iconss" fontSize="large" />


                    </div>

                </div>

            </div>

            {/* <form onSubmit={myFormik.handleSubmit}>
                    <div className="tweetInput">
                        <input
                            id="tweetText"
                            placeholder="What's happening?"
                            value={myFormik.values.tweetText}
                            onChange={myFormik.handleChange}
                            rows="5"
                            cols="50"
                        ></input>
                    </div>

                    <div className="preview">
                        <img width={410} src={preview} alt="" className='prevImage' />
                    </div>

                    <hr />

                    {
                        (myFormik.touched.tweetText && Boolean(myFormik.errors.tweetText)) ?
                            <span style={{ color: "red" }}>{myFormik.errors.tweetText}</span>
                            :
                            null
                    }
                    <br />




                    <div class="image-upload">
                        <div className="iconsContainer">
                            <label for="file-input">
                                <CgImage className='icons' />
                            </label>
                            <HiOutlineGif className='icons' />
                            <BiPoll className='icons' />
                            <BiSmile className='icons' />
                            <GoLocation className='icons' />
                        </div>
                        <input type="file" accept='image/*' id="file-input"
                            onChange={(e) => {

                                let url = URL.createObjectURL(e.currentTarget.files[0])
                                console.log("url: ", url);

                                setPreview(url)
                            }} />



                        <br />

                        <div className="tweetButton">
                            <button type="submit"> Tweet </button>
                        </div>
                    </div>



                </form>

                <div class="tweet-footer">
                    <p class="tweet-date">Jan 30, 2023</p>
                    <div class="tweet-actions">
                        <i class="fa fa-reply"></i>
                        <i class="fa fa-retweet"></i>
                        <i class="fa fa-heart"></i>
                    </div>
                </div> */}


            {/* <div className="tweet">

                <br />
                <br />

                <InfiniteScroll
                    pageStart={0}
                    loadMore={getAllProducts}
                    hasMore={!eof}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >

                    {products.map((eachTweet, i) => (
                        <div key={i} className="productCont">
                            <h2>{eachTweet?.owner?.firstName}</h2>
                            <div>{moment(eachTweet.createdOn).fromNow()}</div>
                            <p>{eachTweet?.text}</p>

                            <img src={eachTweet.imageUrl} alt="tweet image" />

                            <br />

                            <button onClick={() => {
                                deleteTweet(eachTweet._id)
                            }}>Delete</button>

                            <button onClick={() => {
                                editMode(eachTweet)
                            }}>Edit</button>

                            {(isEditMode && editingTweet._id === eachTweet._id) ?
                                <div>
                                    <form onSubmit={editFormik.handleSubmit}>
                                        <input
                                            id="tweetText"
                                            placeholder="Product Name"
                                            value={editFormik.values.tweetText}
                                            onChange={editFormik.handleChange}
                                        />
                                        {
                                            (editFormik.touched.tweetText && Boolean(editFormik.errors.tweetText)) ?
                                                <span style={{ color: "red" }}>{editFormik.errors.tweetText}</span>
                                                :
                                                null
                                        }

                                        <br />

                                        <input
                                            id="productPrice"
                                            placeholder="Product Price"
                                            value={editFormik.values.productPrice}
                                            onChange={editFormik.handleChange}
                                        />
                                        {
                                            (editFormik.touched.productPrice && Boolean(editFormik.errors.productPrice)) ?
                                                <span style={{ color: "red" }}>{editFormik.errors.productPrice}</span>
                                                :
                                                null
                                        }

                                        <br />

                                        <input
                                            id="productDescription"
                                            placeholder="Product Description"
                                            value={editFormik.values.productDescription}
                                            onChange={editFormik.handleChange}
                                        />
                                        {
                                            (editFormik.touched.productDescription && Boolean(editFormik.errors.productDescription)) ?
                                                <span style={{ color: "red" }}>{editFormik.errors.productDescription}</span>
                                                :
                                                null
                                        }

                                        <br />
                                        <button type="submit"> Submit </button>
                                    </form>
                                </div>
                                :
                                null}



                        </div>
                    ))}
                </InfiniteScroll>

            </div> */}
        </div>
    )
}

export default DiscountStore;