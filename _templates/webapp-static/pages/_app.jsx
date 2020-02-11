import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins"
                    rel="stylesheet"
                />
            </Head>
            <main>
                <Component {...pageProps} />
            </main>
            <style global jsx>{`
                html {
                    height: 100%;
                }
                body::after {
                    content: '';
                    height: 100px;
                    display: block;
                }
                body {
                    min-height: 100%;
                    position: relative;
                    background: #fffef4;
                    margin: 0;
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    line-height: 1.5;
                    color: #ea3838;
                }

                .alt {
                    color: #ea3838;
                }

                .main {
                    color: #fafafa;
                }

                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    margin: 0 0 0.5em 0;
                    font-weight: 400;
                    line-height: 1.2;
                }

                h1 {
                    font-size: 2em;
                }

                a {
                    color: inherit;
                }
                button {
                    background-color: #ea3838;
                    box-shadow: 1px 1px 3px 0px #b9b8ad;
                    cursor: pointer;
                    font-size: 1em;
                    padding: 1em;
                    color: #fffef4;
                    border-radius: 3px;
                    font-weight: 600;
                    border: 0;
                    transition: box-shadow 0.1s;
                }
                button:hover {
                    box-shadow: none;
                }

                @media (min-width: 400px) {
                    body {
                        font-size: 16px;
                    }
                }

                select {
                    font-weight: 600;
                    padding: 1em;
                }
                main {
                    margin: 1em;
                }
            `}</style>
        </>
    );
}

App.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object,
};

export default App;