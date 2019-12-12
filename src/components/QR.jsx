import React, { useEffect, useState } from "react";
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles, registerIcons } from 'office-ui-fabric-react/lib/Styling';
import nanoid from "nanoid";

const iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '0 25px'
});

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qr: "",
            uri: (data, size = 300, format = "svg", color = "0000ff") => {
                return `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURI(data)}&size=${size}x${size}&format=${format}&color=${color}`
            },
            iconKey: "",
        };
    }
    componentWillMount() {
        fetch(this.state.uri(this.props.data, 50, "svg", "16-110-190")).then(res => res.text())
        .then(res => {
            console.log(res);
            // Register icon
            this.setState({qr: res.slice()});
        });
    }
    componentDidMount() {
        let key = `${nanoid()}-svg`;
        this.setState({iconKey: key});
        registerIcons({
            icons: {
                [key]: this.state.qr
            }
        });
    }
    render() {
        return (
            <i dangerouslySetInnerHTML={{__html: this.state.qr}} {...this.props}></i>
        );
    }
}