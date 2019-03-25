import React from 'react'
import 'react-quill/dist/quill.snow.css'
import '../../../styles/codeEditor.css'

import AceEditor from 'react-ace'
import CodeEditorToolbar from './CodeEditorToolbar'

// import "brace/mode/java"
// import "brace/mode/django"
// import "brace/mode/haskell"
import "brace/mode/javascript"
// import "brace/mode/json"
// import "brace/mode/python"
// import "brace/mode/xml"
// import "brace/mode/ruby"
// import "brace/mode/sass"
// import "brace/mode/markdown"
// import "brace/mode/mysql"
// import "brace/mode/json"
// import "brace/mode/html"
// import "brace/mode/handlebars"
// import "brace/mode/golang"
// import "brace/mode/csharp"
// import "brace/mode/coffee"
// import "brace/mode/css"
// import "brace/mode/pascal"
// import "brace/mode/ruby"

import "brace/snippets/java"
import "brace/snippets/django"
import "brace/snippets/haskell"
import "brace/snippets/javascript"
import "brace/snippets/json"
import "brace/snippets/python"
import "brace/snippets/xml"
import "brace/snippets/ruby"
import "brace/snippets/sass"
import "brace/snippets/markdown"
import "brace/snippets/mysql"
import "brace/snippets/json"
import "brace/snippets/html"
import "brace/snippets/handlebars"
import "brace/snippets/golang"
import "brace/snippets/csharp"
import "brace/snippets/coffee"
import "brace/snippets/css"
import "brace/snippets/pascal"
import "brace/snippets/ruby"

import "brace/theme/ambiance";
import "brace/theme/chaos";
import "brace/theme/chrome";
import "brace/theme/clouds";
import "brace/theme/clouds_midnight";
import "brace/theme/cobalt";
import "brace/theme/crimson_editor";
import "brace/theme/dawn";
import "brace/theme/dracula";
import "brace/theme/dreamweaver";
import "brace/theme/eclipse";
import "brace/theme/github";
import "brace/theme/gob";
import "brace/theme/gruvbox";
import "brace/theme/idle_fingers";
import "brace/theme/iplastic";
import "brace/theme/katzenmilch";
import "brace/theme/kr_theme";
import "brace/theme/kuroir";
import "brace/theme/merbivore";
import "brace/theme/merbivore_soft";
import "brace/theme/mono_industrial";
import "brace/theme/pastel_on_dark";
import "brace/theme/solarized_dark";
import "brace/theme/solarized_light";
import "brace/theme/sqlserver";
import "brace/theme/terminal";
import "brace/theme/textmate";
import "brace/theme/tomorrow";
import "brace/theme/tomorrow_night";
import "brace/theme/tomorrow_night_blue";
import "brace/theme/tomorrow_night_bright";
import "brace/theme/tomorrow_night_eighties";
import "brace/theme/twilight";
import "brace/theme/vibrant_ink";
import "brace/theme/xcode";

import 'brace/ext/searchbox'
import "brace/ext/language_tools";



const CodeEditor = (props) => {
  // console.log('CodeEditor', props)

  const allPrefs = JSON.parse(localStorage.getItem('defaultUserPrefs'))
  const user = localStorage.getItem('CognitoIdentityServiceProvider.ie27rnhg1utbq5i368586jcf7.LastAuthUser')
  const userPrefs = allPrefs[user]

  console.log(userPrefs)


  const fontSizeInt = parseInt(props.fontSize)

  return (
    <div className="CodeEditor">
      {props.selectedBase.baseName &&
        <div className="codeEditor-block">

          <CodeEditorToolbar
            themeChange={props.themeChange}
            languageChange={props.languageChange}
            fontSizeChange={props.fontSizeChange}
            selectedBase={props.selectedBase} />

          <AceEditor
            fontSize={fontSizeInt}
            mode={props.language ? props.language : 'javascript'}
            theme={props.theme ? props.theme : 'github'}
            onChange={props.onCodeChange}
            defaultValue={props.code}
            value={props.code}
            height={525}
            name="editor-block"
            editorProps={{ $blockScrolling: true }}
            width={''}
            enableLiveAutocompletion={userPrefs.liveAutoCompletion}
            highlightActiveLine={userPrefs.highlightActiveLine} />

        </div>}
    </div >
  )
}


export default CodeEditor