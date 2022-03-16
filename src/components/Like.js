function Like () {
    state = {
        Like:0
    };

    addLike = () => {
        let newCount = this.state.likes + 1;
          this.setState({
          likes: newCount
        });
      };

    return (
        <button onClick={this.addLike} id={this.prop.iteamId}>Likes: {this.state.likes} </button>
    
 
    ) 
     
}
export default Like 