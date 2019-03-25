import React, { Component } from 'react'

import NavBar from '../NavBar'
import CodeEditor from './codeEditor/CodeEditor'
import TextEditor from './textEditor/TextEditor'
import Loading from '../home/Loading'
import PacmanLoader from '../home/PacmanLoader'


import { API } from 'aws-amplify'
import moment from 'moment'

import '../../styles/editor.css'


class Editor extends Component {

  state = {
    loading: true,
    storedId: '',
    editorUserBases: [],
    selectedBase: {},
    language: '',
    theme: '',
    code: '',
    text: '',
    fontSize: null,
    saved: '',
    err: false,
    pacman: false
  }

  componentDidMount = async () => {
    const newState = { ...this.state }
    newState.storedId = await localStorage.getItem('lastSelectedBase')
    newState.editorUserBases = await API.get('api04c14c6b', '/bases')
    await this.setState({
      editorUserBases: newState.editorUserBases,
      storedId: newState.storedId
    })
    this.fetch()
  }



  fetch = () => {
    const newState = { ...this.state }
    newState.selectedBase = newState.editorUserBases.find(base => base.id === newState.storedId && base.deleteVal !== true)

    if (newState.selectedBase) {
      newState.code = newState.selectedBase.codeNote
      newState.fontSize = newState.selectedBase.fontSize
      newState.text = newState.selectedBase.textNote
      newState.theme = newState.selectedBase.theme
      newState.language = newState.selectedBase.codeLanguage
    }
    else {
      window.location.reload()
    }

    this.setState({
      fontSize: newState.fontSize,
      text: newState.text,
      code: newState.code,
      selectedBase: newState.selectedBase,
      language: newState.language,
      theme: newState.theme,
      loading: false
    })
  }

  updateDB = async () => {
    this.setState({ saved: false })
    const updateItem = { ...this.state.selectedBase }

    updateItem.codeNote = this.state.code
    updateItem.textNote = this.state.text
    updateItem.theme = this.state.theme
    updateItem.codeLanguage = this.state.language
    updateItem.fontSize = this.state.fontSize
    updateItem.modifiedAt = moment().format()

    await API.put("api04c14c6b", "/bases", {
      body: updateItem
    })
      .then(response => response.success ? this.setState({ saved: true }) : '')
      .catch(err => this.setState({ err: true }))
  }

  onCodeChange = async (codeValue) => {
    const newState = { ...this.state }
    newState.code = codeValue
    await this.setState({ code: newState.code })
    this.updateDB()
  }

  onTextChange = async (textValue) => {
    const newState = { ...this.state }
    newState.text = textValue
    await this.setState({ text: newState.text })
    this.updateDB()
  }

  themeChange = async (event) => {
    const newState = { ...this.state }
    newState.theme = event.target.value
    await this.setState({ theme: newState.theme })
    this.updateDB()
  }

  languageChange = async (event) => {
    const newState = { ...this.state }
    newState.language = event.target.value
    await this.setState({ language: newState.language })
    this.updateDB()
  }

  fontSizeChange = async (event) => {
    const newState = { ...this.state }
    newState.fontSize = parseInt(event.target.value)
    await this.setState({ fontSize: newState.fontSize })
    this.updateDB()
  }

  render() {
    return (
      <div className="Editor" >
        <NavBar />
        {this.state.loading ?
          <div className="row editor-loading-parent">
            <div className="col-md-12 editor-loading">
              {this.props.pacman ? <PacmanLoader size={50} /> : <Loading />}
            </div>
          </div>
          :
          <React.Fragment>
            {this.state.err &&
              <div className="alert alert-danger" role="alert">
                An error has occurred! Please <a onClick={() => window.location.reload()}>refresh</a> page
          </div>
            }
            < div className="row editor-header-row container my-2">
              <div className="col-md-12">
                {this.state.selectedBase &&
                  <h3>{this.state.selectedBase.baseName}
                    {this.state.saved !== '' ?
                      this.state.saved ?
                        <span className="ml-2 saved-text">All Changes Saved</span>
                        :
                        <span className="ml-2 saved-text">Saving...</span> : ''}
                  </h3>}
              </div>
            </div>

            {
              this.state.selectedBase &&
              <div className="row ">
                <div className="col-md-6">
                  <TextEditor
                    onChange={this.onChange}
                    textVal={this.state.textVal}
                    onTextChange={this.onTextChange}
                    selectedBase={this.state.selectedBase} />
                </div>

                <div className="col-md-6">
                  <CodeEditor
                    onChange={this.onChange}
                    fontSize={this.state.fontSize}
                    code={this.state.code}
                    language={this.state.language}
                    theme={this.state.theme}
                    themeChange={this.themeChange}
                    languageChange={this.languageChange}
                    fontSizeChange={this.fontSizeChange}
                    onCodeChange={this.onCodeChange}
                    selectedBase={this.state.selectedBase} />
                </div>
              </div>
            }
          </React.Fragment>}
      </div>
    )
  }
}

export default Editor