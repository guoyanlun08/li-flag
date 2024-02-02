import styled from 'styled-components';

export const Styled_LoginBox = styled.div<{ active: string }>`
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    .pwd-login{
        height: 100%;
        padding-right: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        transition: all .5s ease;
        flex: ${(props) => (props.active == 'accountAndPhone' ? 3 : 1)};
        .pwd-login-unfold{
            width: 100%;
            display: ${(props) => (props.active == 'accountAndPhone' ? 'block' : 'none')};
            transition: all 1s ease;
        }
        .pwd-login-fold{
            width: 100%;
            height: 100%;
            display: ${(props) => (props.active == 'social' ? 'flex' : 'none')};
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            transition: all 1s ease;
            &>div{
                display: flex;
                flex-direction: column;
                justify-content: center ;
                align-items: center;
                padding: 5px;
                &:hover{
                    cursor: pointer;
                    border-radius: 5px;
                    background-color: #e1e1e145;
                }
            }
            
        }
        .login-form-button{
            width: 100%;
        }
        .user-pwd-foot{
            display: flex;
            justify-content: space-between;
        }
        &::after{
            content: "";
            width: 1px;
            height: 80%;
            background-color: #ccc;
            position: absolute;
            right: -1px;
            top: 10%;
        }
    }
    .social-login{
        height: 100%;
        flex: ${(props) => (props.active == 'social' ? 3 : 1)};
        .social-login-unfold{
            height: 100%;
            display: ${(props) => (props.active == 'social' ? 'flex' : 'none')};
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .social-login-footer{
                margin-top: 15px;
                display: flex;
                justify-content: space-evenly;
                gap: 15px;
            }
        }
        .social-login-fold{
            height: 100%;
            display: ${(props) => (props.active == 'social' ? 'none' : 'flex')};
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            &>div{
                display: flex;
                flex-direction: column;
                justify-content: center ;
                align-items: center;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        
    }
`;
export const Styled_Agreement = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;