import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const Accueil = () => {
    const [page, setPage] = useState(null);

    useEffect(() => {
        axios.get('https://eisee-it.o3creative.fr/2023/groupe4/wp-json/wp/v2/pages')
            .then(response => {
                const accueilPage = response.data.find(page => page.slug === 'accueil');
                setPage(accueilPage);
            })
            .catch(error => console.error(error));
    }, []);

    if (!page) {
        return (<div className='centered'>
            <FontAwesomeIcon icon={faSpinner} spin />
            <p>Loading...</p>
        </div>);
    }

    return (
        <div>
            <h1>{page.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </div>
    );
};

export default Accueil;