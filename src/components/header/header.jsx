import React,{useState, useEffect, useRef} from "react";
import "./header.less";
import { reqWeather } from "../../api/index";
import  {formateDate }  from "../../utils/dateUtils";
import { withRouter } from "react-router-dom";
import menuItems from '../../config/menuConfig';
import { Modal } from 'antd';
import dlut from "../../assets/images/dlut.png";
import LinkButton from "../link-button";

const HeaderBar = (props) =>{
    const [Weather, setWeather] = useState('rain');
    const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
    const timer = useRef();
    const path = props.location.pathname;
    const {confirm} = Modal;

    useEffect(() => {
      timer.current = setInterval(() => {
          setCurrentTime(formateDate(Date.now()));
      }, 1000);
    //   return clearInterval(timer.current) 需要用一个清除函数包一层
    return function clearUp(){
     clearInterval(timer.current)
    }
    }, [])
    //从list中获取当前匹配的path 然后获取title
    const getTtile = () => {
        let title;
        menuItems.forEach(item => {
            if (item.key === path){
                title = item.title.toUpperCase();
            }else if(item.children){
               const cItem = item.children.find(cItem => cItem.key === path)
               if(cItem){
                   title = cItem.title.toUpperCase();
               }
            }
        })
        return title;
    }
    const title = getTtile();

    //获取天气
    useEffect(() => {
        async function fetchData() {
            const result = await reqWeather('v1','通化','41596874','fm7MLHWH');
            const {wea} = result.data[0]
            setWeather(wea)
          }
          fetchData();
    }, [])

     const logout =() =>{
        confirm({
            title: 'Do you Want to EXIT?',
            onOk:() => {
              console.log('OK');
              props.history.raplace('/login')
            },
            onCancel() {
              console.log('Cancel');
            },
          });
      }
    return (
        <div className='header'>
            <div className='header-top'>
                <span>hello admin!</span>
                <LinkButton onClick={logout}>EXIT</LinkButton>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>
                    <span>{title}</span>
                </div>
                <div className='header-bottom-right'>
                    <span style={{margin : '0 10px'}}>{currentTime}</span>
                    <span>{Weather}</span>
                    <img alt='logo' src={dlut}></img>
                </div>
            </div>
        </div>
    )
}


export default withRouter(HeaderBar);