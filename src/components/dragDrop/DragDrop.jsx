import React, { useRef, useState } from 'react'

function DragDrop() {
    const [image, setImage] = useState([]);
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)



    const handleFile = (e) => {
        const file = e.target?.files;
        console.log(file)
        if(file.lenght === 0) return;
        for(let x = 0; x < file.length; x++){
        if(file[x].type.split('/')[0] !== 'image') continue;
        if(!image.some(e=>e.name === file[x].name)){
            setImage(prev=>[...prev,
            {
                name: file[x].name,
                url: URL.createObjectURL(file[x]),
            }
            ])
        }
        }
    }
    const deleteImage = (idx) => setImage((prev)=>prev.filter((_,i)=> i!==idx));
    
    const onDrageOver = (e) => {
        e.preventDefault();
        setIsDragging(true)
        e.dataTransfer.dropEffect = "copy"
    }

    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false)
    }

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false)
        const file = e.dataTransfer.files;
        for(let x = 0; x < file.length; x++){
        if(file[x].type.split('/')[0] !== 'image') continue;
        if(!image.some(e=>e.name === file[x].name)){
            setImage(prev=>[...prev,
            {
                name: file[x].name,
                url: URL.createObjectURL(file[x]),
            }
            ])
        }
        }
    }


    return (
        <div className="images" style={{}}>
            <div onDragOver={(e)=>onDrageOver(e)} onDragLeave={(e)=>onDragLeave(e)} onDrop={(e)=>onDrop(e)} className="flex j-c-c v-flex a-i-c" style={{padding: '2rem',border: '2px dashed blue', height: '300px', width: '100%'}}>
                {
                !isDragging ? (
                    <>
                    <span>Upload Image</span><br />
                    <span>Drag and drop image here</span>
                    <div style={{width: '150px', margin: '0.5rem'}} className='flex'>
                        <hr style={{padding: '0', margin: '0', width: '50%'}}/>
                        <b>OR</b>
                        <hr style={{padding: '0', margin: '0', width: '50%'}}/>
                    </div>

                    <div className="flex v-flex j-c-c a-i-c shadow mt-1 relative" style={{width: '150px', height:'100px'}}>
                        <input multiple ref={fileInputRef} onChange={(e)=>handleFile(e)} type="file" name="" id="" className='absolute top-0 bottom-0 right-0 left-0' style={{opacity:'0'}}/>
                        <h3>Browse from computer</h3>
                    </div>
                    </>
                ) : (
                    <>
                    <h3>Drop Here</h3>
                    </>
                )
                }
                
            </div>
            <div className='flex flex-wrap' style={{width: '100%'}}>
                {
                image?.map((img, idx, arr)=>{
                    return(
                    <div key={idx} className="shadow relative mt-1 mb-1 mr-1" style={{width: '100px', height: '100px'}}>
                        <b onClick={()=>deleteImage(idx)} role='button' className='shadow absolute round flex j-c-c' style={{width: '25px', height: '25px', background: 'white', margin: '5px', zIndex: '5'}}>&times;</b>
                        <img src={img.url } alt="" className='img-fit'/>
                    </div>
                    )
                })
                }
                
            </div>
            
            </div>
    )
}

export default DragDrop