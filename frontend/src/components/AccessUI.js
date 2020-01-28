import React, { useState } from 'react';

function AccessUI(props)
{
    var contact = '';
    var search = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [contactList, setContactList] = useState('');

    var userId = props.userId;

    if ( userId === undefined )
    {
        userId = 1;
    }

    const addContact = async event =>
    {
        event.preventDefault();

        var js = '{"userId":"'+userId+'","contact":"'+contact.value+'"}';

        try{
            const response = await fetch('http://localhost:5000/api/addContact',
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);

            if ( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error);
            }
            else
            {
                setMessage('Contact has been added.')
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }
    };

    const searchContact = async event =>
    {
        event.preventDefault();

        var js = '{"userId":"'+userId+'","search":"'+search.value+'"}';

        try
        {
            const response = await fetch('http://localhost:5000/api/searchContacts',
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);
            var _results = res.results;
            var resultText = '';

            for (var i=0; i < _results.length; i++)
            {
                resultText += _results[i];
                if (i < _results.length - 1)
                {
                    resultText += ', ';
                }
                setResults('Contact(s) have been retrieved.');
                setContactList(resultText);
            }
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };

    return(
        <div>
            <input type="text" placeholder="Contact to search for..." ref={(c) => search = c} />
            <button type="button" class="buttons" onClick={searchContact}>Search Contact</button><br />
            <span>{searchResults}</span>
            <p>{contactList}</p>

            <input type="text" placeholder="Contact to add..." ref={(c) => contact = c} />
            <button type="button" class="buttons" onClick={addContact}>Add Contact</button>
            <span>{message}</span>
        </div>
    );
}

export default AccessUI;