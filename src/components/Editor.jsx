import { useState } from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';

import { Controlled as ControlledEditor } from 'react-codemirror2';

import { Box, styled } from '@mui/material';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import '../App.css';

const Container = styled(Box)`
    flex-grow: 1;
    flex-basic: 0;
    display: flex;
    flex-direction: column;
    padding: 0 8px 8px;
`

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    background: #060606;
    color: #AAAEBC;
    font-weight: 700;
`
const Heading = styled(Box)`
    background: #1d1e22;
    padding: 9px 12px;
    display: flex
`

const Editor = ({ heading, language, value, onChange, icon, color }) => {

   
    const [isLocked, setisLocked]= useState(false)

    const handleChange = (editor, data, value) => {
        onChange(value);
    }

    const handleCopyClick =()=>{
        navigator.clipboard.writeText(value)
    }
    const handleSaveClick=()=>{
      try{
        localStorage.setItem('saved-Code', value);
        alert('Code saved to local storage!')
      }catch(error){
        console.error('Error in saving code', error)
        alert('Failed to save code')
      }
    }

    const handleLockUnLock=()=>{
        setisLocked((prevIsLocked)=> !prevIsLocked
        )}
    

    return (
        <Container>
            <Header>
                <Heading>
                    <Box 
                        component="span"
                        style={{
                            background: color,
                            borderRadius: 5,
                            marginRight: 5,
                            height: 20,
                            width: 20,
                            display: 'flex',
                            placeContent: 'center',
                            color: '#000',
                            paddingBottom: 2
                        }}
                    >
                        {icon}
                    </Box>
                    {heading}
                 </Heading>
                       {/******************* COPY BUTTON************ */}
                <Button 
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<CopyAllIcon/>}
                  onClick={handleCopyClick}>
                    copy
                </Button>

                  {/******************* SAVE BUTTON************ */}

                <Button 
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<SaveIcon/>}
                  onClick={handleSaveClick}>
                    Save
                </Button>

                  {/******************* LOCK/UNLOCK BUTTON************ */}

                <Button 
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={ isLocked? <LockIcon/>: <LockOpenIcon/>}
                  onClick={handleLockUnLock}>
                   {isLocked ? "Unlock" : "Lock"}
                </Button>

                
                
            </Header>

              {/******************* EDITOR AREA CONTROLS AND FUNCTIONALITIES************ */}
            <ControlledEditor 
                onBeforeChange={handleChange}
                value={value}
                className="controlled-editor"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    lineNumbers: true,
                    theme: 'material',
                    readOnly: isLocked,
                    autoCloseBrackets: true,
                    matchBrackets: true,
                    matchTags: {bothTags:true},
                    extraKeys:{
                        'Ctrl-/': 'toggleComment',
                        'Tab': 'indentMore',
                        'Shift-Tab': 'indentLess'
                    }
                }}
            />
        </Container>
    )
}

export default Editor;