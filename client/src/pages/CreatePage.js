import {useState, useEffect, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/Auth.Context";



function CreatePage() {
    const auth = useContext(AuthContext)
    const {request} = useHttp();
    const [link, setLink] = useState('');

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
              const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`})
                setLink(data);
            } catch (e) {}
        }
    }

    return (
        <div className='row'>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Paste a link"
                        id="link"
                        type="text"
                        onChange={e => e.target.value}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Type a link</label>
                </div>
            </div>


            CreatePage
        </div>
    );
}

export default CreatePage;