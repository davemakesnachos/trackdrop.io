import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

export class DeleteButton extends Component {
    state = { open: false }

    show = () => this.setState({ open: true })
    handleConfirm = () => {this.props.confirmdelete(); this.setState({ open: false })}
    handleCancel = () => this.setState({ open: false })
    contentText = ('Are you sure you want to delete ' + this.props.track.name + '? This cannot be undone!')
    headerText = 'Are you sure?'

    render() {
    return (
        <div>
        <Button color='red' size='mini' floated='right' onClick={this.show}>Delete</Button>
        <Confirm
            open={this.state.open}
            header={this.headerText}
            content={this.contentText}
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
        />
        </div>
    )
    }
}
