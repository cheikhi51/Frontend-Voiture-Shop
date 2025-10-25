import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class MyToast extends Component {
    render() {
        const toastCss = {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '1',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        };

        // Déterminer la classe CSS en fonction du type
        const getToastClass = () => {
            switch(this.props.type) {
                case 'danger':
                    return "border border-danger bg-danger text-white";
                case 'success':
                default:
                    return "border border-success bg-success text-white";
            }
        };

        const getToastTitle = () => {
            switch(this.props.type) {
                case 'danger':
                    return "Erreur";
                case 'success':
                default:
                    return "Success";
            }
        };

        return (
            <div style={this.props.show ? toastCss : null}> 
                <Toast className={getToastClass()} show={this.props.show}> 
                    <Toast.Header className={getToastClass()} closeButton={false}> 
                        <strong className="mr-auto">{getToastTitle()}</strong> 
                    </Toast.Header> 
                    <Toast.Body> 
                        {this.props.message} 
                    </Toast.Body> 
                </Toast> 
            </div> 
        );
    }
}