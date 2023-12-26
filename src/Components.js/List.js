import jsPDF from 'jspdf';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import './list.css'


function List() {

    const [list, setlist] = useState(
        {
            text: "",
        }
    )

    const [newlist, setnewlist] = useState([])


    const getlist = (e) => {
        setlist({ ...list, [e.target.name]: e.target.value, });
    }



    const add = () => {
        if (list.text === '') {
            return toast.error('empty list cannot be added')
        } else {
            toast.success('list added successfully')

        }
        console.log(list);
        setnewlist([...newlist, list]); // Spread the individual elements of list
        setlist({
            text: "",
        });
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the default behavior of the Enter key in a textarea
            add(); // Simulate a click on the "ADD" button
        }
    };


    const deleteall = () => {
        setlist({ text: "" });
        setnewlist([]); 
        toast.success('list cleared')// Use setnewlist to update the state of newlist
    };

     const dellist =(index) => {
        newlist.splice(index,1)
        setnewlist([...newlist])
        toast.success('removed')

     }

     const downloadlist =()=>{
        const doc = new jsPDF();  //create new instance for jspdf libraryx  
        doc.text('', 20, 10) //naming the doc
        newlist.forEach((item,index)=> //to apply the condition to all the element
        {
            const yposition = 20 + index*10; // Calculate the y-position for each item in the PDF
            doc.text(`${index + 1}. ${item.text}`,20, yposition)
        })
        doc.save('list.pdf')

        // console.log("list to be downloaded",newlist)
     }





    return (
        <div>




            <div>


                <div className='row m-auto  '>

                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 text-center'>
                        <div>
                            <label className='mt-4 fw-bolder'>TYPE HERE : </label><br />
                            <textarea typeof='text' style={{ width: '80%', marginTop: "20px" }}
                                name='text'
                                value={list.text}
                                onChange={(e) => getlist(e)}
                                onKeyPress={(e) => handleKeyPress(e)}
                            >
                            </textarea>
                        </div>
                        <button className='btn btn-primary' onClick={() => add()}>ADD </button>
                    </div>





                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6' >
                    <div className='' style={{ marginLeft: "35%", marginTop: "50px"  }}>
                    <button className='btn btn-success fw-bold '  onClick={() => downloadlist()}>Download</button>

                                <button className='btn btn-danger fw-bold  ms-1'  onClick={() => deleteall()}>Delete all</button>
                            </div>
                        <div className='border border-secondary' >
                            
                            <table >

                                <tbody>
                                    {
                                        newlist.map((data, index) => {
                                            return (<tr>
                                                <th scope="row">{index + 1}.</th>
                                                <td>{data.text}</td>
                                                <td><button className='btn btn-sm btn-danger' style={{ borderRadius: "50%" }} onClick={()=>dellist(index)}>X</button></td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>


                        </div>

                    </div>


                </div>



            </div>











        </div>
    )
}

export default List