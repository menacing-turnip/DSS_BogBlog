import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import "./contact.css"
import DOMPurify from 'dompurify';
const browserify = require('browserify-fs');


export default function Contact() {
    const defaultValue = ""
    const [value, setValue] = React.useState(defaultValue);
    
    const getValue = () => {
        return value.defaultValue;
    }

    /* --- Save Form Responses To Local --- */

    // NOTE: Web browsers do not have permissions to edit documents. This means that although
    //       a hypothetical file and folder has been created in the console of the browser,
    //       neither have actually been created on the user's local machine.

    const handleSaveToLocal = () => {
        browserify.mkdir('local', { recursive: true }, (err) => {
            if (err) throw err
            console.log('Folder Created.');

            browserify.writeFile('/local/copyOfResponses.txt', getValue, (err) => {
                if (err) throw err
                console.log('File has been created successfully. Content:\n\n' + value.defaultValue);
            });
        });
    }

    /* --- Download Form Responses To Local --- */

    // NOTE: This function on submission will download the responses given in the text fields
    //       and save to a file named 'copyOfResponses.txt'.

    const handleDownload = () => {
        const data = JSON.stringify(getValue);
        const blob = new Blob([data], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'copyOfReponses.txt';
        link.href = url;
        link.click();
    }

    return (
        <>
            <div className="contactUs">
                <span className="contactUsTitle">Want To Get In Contact?</span>
                <span className="contactUsSubTitle">Feel free to send us your contact information and any questions you have!</span>
                <br/>
                <textarea 
                    value={value}
                    className="contactUsInput"
                    placeholder="First Name... &#10;Last Name... &#10;Email Address... &#10;Comments... &#10;"
                    onChange={(e) => setValue(e.target.value)}
                />
                <br/>
                {/* TESTING SIMPLE ALERT ATTACK & REDIRECTION ATTACK */}

                {/* 1. ALERT ATTACK */}

                {/* ALERT ATTACK (SUCCESS):  <img onError='alert("Hacked!")'; src='invalid.url.com' /> */}
                {/* DELETE ME TO TEST: <div dangerouslySetInnerHTML={{"__html": value}} /> */}
                {/* ALERT ATTACK (FAILURE):  <img onError='alert("Hacked!")'; src='invalid.url.com' /> */}
                {/* DELETE ME TO TEST: <div dangerouslySetInnerHTML={{"__html": DOMPurify.sanitize(value)}} /> */}

                {/* 2. REDIRECTION ATTACK */}

                {/* REDIRECTION ATTACK (SUCCESS):  <img src=??? onerror="location.replace('https://www.minecraft.net/en-us')" /> */}
                {/* DELETE ME TO TEST: <div dangerouslySetInnerHTML={{"__html": value}} /> */}
                {/* REDIRECTION ATTACK (FAILURE):  <img src=??? onerror="location.replace('https://www.minecraft.net/en-us')" /> */}
                {/* DELETE ME TO TEST: <div dangerouslySetInnerHTML={{"__html": DOMPurify.sanitize(value)}} /> */}

                    <button className="contactSubmitButton" type="button" onClick={() => {
                        console.log(value);
                    }}><Link to="/" className="link">Submit</Link></button>
                    <br/>
                    <span className="contactUsSubTitle">Or send us an email at <b>bogblogenquiries@bogblog.co.uk</b></span>
                    <button className="contactDownloadButton" type="button" onClick={handleDownload}>Download Copy of Responses</button>
            </div>
        </>
    )
}