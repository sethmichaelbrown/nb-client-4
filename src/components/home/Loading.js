import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';


class Loading extends Component {
  state = {
    loading: true
  }

  render() {
    return (
      <div className='sweet-loading'>
        <ClipLoader
          sizeUnit={"px"}
          size={50}
          color={'#5C908F'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default Loading