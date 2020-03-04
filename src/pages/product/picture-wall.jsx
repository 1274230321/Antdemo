import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { UPLOAD_IMG_NAME } from "../../utils/cosntants";
import { Modal, Upload, Icon, message } from "antd";
import { reqDeleteImage, reqUploadImage } from "../../api/index";


let PictureWall = (props, ref) => {
    const imgs = props.imgs
    //如果是add img为空数组
    const imgsList = imgs ? imgs.map((value, index)=>({
        uid: `${-index}`,
        name: `${value}`,
        status: 'done', //loading error
        url: `http://localhost:5000/upload/${value}`
    })) : []
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [fileList, setFileList] = useState([])

    useEffect(() => {
        setFileList(imgsList)
    }, [])

    useImperativeHandle(ref, () => ({
        getImgs: () => fileList.map(file => file.name)
      }));
     

    //callback
    const handleCancel = () => { 
        setPreviewVisible(false)
    }
    const handleChange = async ({file, fileList}) => {
        console.log(file, fileList)
        if(file.status === 'done'){
            const result = file.response
            if(result.status === 0){
                message.success('Picture upload success')
                const {name, url} = result.data
                //file 和 filelist最后一个 是不同的对象 最后set的filelist
                //如果不改filelist 看不到效果
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            }else{
                message.error('Upload failed')
            }
        }else if(file.status === 'removed'){
            const result = await reqDeleteImage(file.name) 
            if(result.status === 0) {
                message.success('Delete success')
                } else { 
                    message.error('Delete failed')
                }

        }
        setFileList(fileList)
    }
    const handlePreview = (file) => {
        setPreviewImage(file.url || file.thumbUrl)
        setPreviewVisible(true)
    }

    //data
    const uploadButton = ( 
            <div>
                <Icon type="plus"/>
                <div>Upload Pictures</div> 
            </div>
    )
        

    return (
        <div>
            <Upload 
            action="/manage/img/upload" 
            accept="image/*"
            name={UPLOAD_IMG_NAME} 
            listType="picture-card" 
            fileList={fileList} 
            onPreview={handlePreview} 
            onChange={handleChange}
            >
                {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal 
            visible={previewVisible} 
            footer={null} 
            onCancel={handleCancel}
            > 
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )

}
PictureWall = forwardRef(PictureWall);
export default PictureWall;