import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {logout} from '../../redux/actions'
import "./header.less";
import { reqWeather } from "../../api/index";
import { formateDate } from "../../utils/dateUtils";
import { withRouter } from "react-router-dom";
import { Modal } from 'antd';
import dlut from "../../assets/images/dlut.png";
import LinkButton from "../link-button";

const HeaderBar = (props) => {
    const [Weather, setWeather] = useState('rain');
    const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
    const timer = useRef();
    const path = props.location.pathname;
    const { confirm } = Modal;

    useEffect(() => {
        timer.current = setInterval(() => {
            setCurrentTime(formateDate(Date.now()));
        }, 1000);
        //   return clearInterval(timer.current) 需要用一个清除函数包一层
        return function clearUp() {
            clearInterval(timer.current)
        }
    }, [])
    //从list中获取当前匹配的path 然后获取title

    const title = props.headerTitle.toUpperCase()

    //获取天气
    useEffect(() => {
        async function fetchData() {
            const result = await reqWeather('通化');
            const { wea } = result.data[0]
            setWeather(wea)
        }
        fetchData();
    }, [])

    const logout = () => {
        confirm({
            title: 'Do you Want to EXIT?',
            onOk: () => {
                props.logout()
            },
            onCancel() {
            },
        });
    }
    return (
        <div className='header'>
            <div className='header-top'>
                <span>hello {props.user.username}</span>
                <LinkButton onClick={logout}>EXIT</LinkButton>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>
                    <span>{title}</span>
                </div>
                <div className='header-bottom-right'>
                    <span style={{ margin: '0 10px' }}>{currentTime}</span>
                    <span>{Weather}</span>
                    <img alt='logo' src={dlut}></img>
                </div>
            </div>
        </div>
    )
}


export default connect(
    state => ({
        headerTitle: state.headerTitle,
        user: state.user
    }),
    { logout }
)(withRouter(HeaderBar));