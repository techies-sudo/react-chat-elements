import React from 'react';
import './MessageBox.css';

import PhotoMessage from '../PhotoMessage/PhotoMessage';
import FileMessage from '../FileMessage/FileMessage';
import SystemMessage from '../SystemMessage/SystemMessage';
import LocationMessage from '../LocationMessage/LocationMessage';
import SpotifyMessage from '../SpotifyMessage/SpotifyMessage';
import ReplyMessage from '../ReplyMessage/ReplyMessage';
import MeetingMessage from '../MeetingMessage/MeetingMessage';
import VideoMessage from '../VideoMessage/VideoMessage';
import AudioMessage from '../AudioMessage/AudioMessage';

import Avatar from '../Avatar/Avatar';

import FaForward from 'react-icons/lib/fa/mail-forward';

import IoDoneAll from 'react-icons/lib/io/android-done-all';
import MdIosTime from 'react-icons/lib/md/access-time';
import MdCheck from 'react-icons/lib/md/check';
import MdMessage from 'react-icons/lib/md/message';
import MdRemove from 'react-icons/lib/md/delete';
import MdBlock from 'react-icons/lib/md/block';

import {
    format,
} from 'timeago.js';

import classNames from 'classnames';

export class MessageBox extends React.PureComponent {
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(this.props.style)
        if (nextProps.focus !== this.props.focus && nextProps.focus === true) {
            if (this.refs['message']) {
                this.refs['message'].scrollIntoView({
                    block: "center",
                    behavior: 'smooth'
                })

                this.props.onMessageFocused(nextProps);
            }
        }
    }

    render() {
        var positionCls = classNames('rce-mbox', { 'rce-mbox-right': this.props.position === 'right' });
        var thatAbsoluteTime = !/(text|video|file|meeting|audio)/g.test(this.props.type) && !(this.props.type === 'location' && this.props.text);

        const dateText = this.props.dateString 

        return (
            <div
                ref='message'
                className={classNames('rce-container-mbox', this.props.className)}
                onClick={this.props.onClick}>
                {
                    this.props.renderAddCmp instanceof Function &&
                    this.props.renderAddCmp()
                }
                {
                    this.props.type === 'system' ?
                        <SystemMessage
                            text={this.props.text} />
                        :
                        <div
                            className={classNames(
                                positionCls,

                                {'rce-mbox--clear-padding': thatAbsoluteTime},
                                {'rce-mbox--clear-notch': !this.props.notch},
                                { 'message-focus': this.props.focus},
                            )} style={this.props.style}>
                            <div
                                className='rce-mbox-body'
                                onContextMenu={this.props.onContextMenu}>
                                {
                                    !this.props.retracted &&
                                    this.props.forwarded === true &&
                                    <div
                                        className={classNames(
                                            'rce-mbox-forward',
                                            { 'rce-mbox-forward-right': this.props.position === 'left' },
                                            { 'rce-mbox-forward-left': this.props.position === 'right' }
                                        )}
                                        onClick={this.props.onForwardClick}>
                                            <FaForward />
                                    </div>
                                }

                                {
                                    !this.props.retracted &&
                                    this.props.replyButton === true &&
                                    <div
                                        className={this.props.forwarded !== true ? classNames(
                                            'rce-mbox-forward',
                                            { 'rce-mbox-forward-right': this.props.position === 'left' },
                                            { 'rce-mbox-forward-left': this.props.position === 'right' }
                                        ) : classNames(
                                            'rce-mbox-forward',
                                            { 'rce-mbox-reply-btn-right': this.props.position === 'left' },
                                            { 'rce-mbox-reply-btn-left': this.props.position === 'right' }
                                        )}
                                        onClick={this.props.onReplyClick}>
                                            <MdMessage />
                                    </div>
                                }

                                {
                                    !this.props.retracted &&
                                    this.props.removeButton === true &&
                                    <div
                                        className={this.props.forwarded === true ? classNames(
                                            'rce-mbox-remove',
                                            { 'rce-mbox-remove-right': this.props.position === 'left' },
                                            { 'rce-mbox-remove-left': this.props.position === 'right' }
                                        ) : classNames(
                                            'rce-mbox-forward',
                                            { 'rce-mbox-reply-btn-right': this.props.position === 'left' },
                                            { 'rce-mbox-reply-btn-left': this.props.position === 'right' }
                                        )}
                                        onClick={this.props.onRemoveMessageClick}>
                                            <MdRemove />
                                    </div>
                                }

                                {
                                    (this.props.title || this.props.avatar) &&
                                    <div
                                        style={this.props.titleColor && { color: this.props.titleColor }}
                                        onClick={this.props.onTitleClick}
                                        className={classNames('rce-mbox-title', {
                                            'rce-mbox-title--clear': this.props.type === 'text',
                                        })}>
                                        {
                                            this.props.avatar &&
                                            <Avatar
                                                letterItem={this.props.letterItem}
                                                src={this.props.avatar}/>
                                        }
                                        {
                                            this.props.title &&
                                            <span style={{width:'100%',overflowWrap:'anywhere'}}>{this.props.title}</span>
                                        }
                                      {!this.props.below?<div style={{bottom:'-22px'}}
                                    className={classNames(
                                        'rce-mbox-time',
                                        { 'rce-mbox-time-block': thatAbsoluteTime },
                                        { 'non-copiable': !this.props.copiableDate },
                                    )}
                                    data-text={ dateText}>
                                    {
                                    }
                                    {
                                        this.props.status &&
                                        <span className='rce-mbox-status'>
                                            {
                                                this.props.status === 'waiting' &&
                                                <MdIosTime />
                                            }

                                            {
                                                this.props.status === 'sent' &&
                                                <MdCheck />
                                            }

                                            {
                                                this.props.status === 'received' &&
                                                <IoDoneAll />
                                            }

                                            {
                                                this.props.status === 'read' &&
                                                <IoDoneAll color='#4FC3F7'/>
                                            }
                                        </span>
                                    }
                                </div>:null}
                                    </div>
                                }

                                {
                                    this.props.reply &&
                                    <ReplyMessage
                                        photoURL={this.props.reply.photoURL}
                                        title={this.props.reply.title}
                                        titleColor={this.props.reply.titleColor}
                                        message={this.props.reply.message}
                                        onClick={this.props.onReplyMessageClick}/>
                                }

                                {
                                    this.props.type === 'text' &&
                                    <div className={classNames(`ce-mbox-text ${this.props.titleColor}`, {
                                        'rce-mbox-text-retracted': this.props.retracted,
                                        'left': this.props.position === 'left',
                                        'right': this.props.position === 'right',
                                    })}>
                                        {
                                            this.props.retracted &&
                                            <MdBlock />
                                        }
                                        {this.props.text}
                                    </div>
                                }

                                {
                                    this.props.type === 'location' &&
                                    <LocationMessage
                                        onOpen={this.props.onOpen}
                                        data={this.props.data}
                                        target={this.props.target}
                                        href={this.props.href}
                                        apiKey={this.props.apiKey}
                                        src={this.props.src}
                                        zoom={this.props.zoom}
                                        markerColor={this.props.markerColor}
                                        text={this.props.text} />
                                }

                                {
                                    this.props.type === 'photo' &&
                                    <PhotoMessage
                                        onOpen={this.props.onOpen}
                                        onDownload={this.props.onDownload}
                                        onLoad={this.props.onLoad}
                                        onPhotoError={this.props.onPhotoError}
                                        data={this.props.data}
                                        width={this.props.width}
                                        height={this.props.height}
                                        text={this.props.text} />
                                }

                                {
                                    this.props.type === 'video' &&
                                    <VideoMessage
                                        onOpen={this.props.onOpen}
                                        onDownload={this.props.onDownload}
                                        onLoad={this.props.onLoad}
                                        onPhotoError={this.props.onPhotoError}
                                        data={this.props.data}
                                        width={this.props.width}
                                        height={this.props.height}
                                        text={this.props.text} />
                                }

                                {
                                    this.props.type === 'file' &&
                                    <FileMessage
                                        onOpen={this.props.onOpen}
                                        onDownload={this.props.onDownload}
                                        data={this.props.data}
                                        text={this.props.text} />
                                }

                                {
                                    this.props.type === 'spotify' &&
                                    <SpotifyMessage
                                        width={this.props.width}
                                        height={this.props.height}
                                        theme={this.props.theme}
                                        view={this.props.view}
                                        data={this.props.data}
                                        uri={this.props.uri || this.props.text} />
                                }

                                {
                                    this.props.type === 'meeting' &&
                                    this.props.meeting &&
                                    <MeetingMessage
                                        subject={this.props.meeting.subject}
                                        title={this.props.meeting.title}
                                        date={this.props.meeting.date}
                                        dateString={this.props.meeting.dateString}
                                        collapseTitle={this.props.meeting.collapseTitle}
                                        participants={this.props.meeting.participants}
                                        moreItems={this.props.meeting.moreItems}
                                        dataSource={this.props.meeting.dataSource}
                                        onClick={this.props.onMeetingMessageClick}
                                        onMeetingMoreSelect={this.props.onMeetingMoreSelect}
                                        onMeetingVideoLinkClick={this.props.onMeetingVideoLinkClick}
                                        onMeetingTitleClick={this.props.onMeetingTitleClick} />
                                }
                                {
                                    this.props.type === 'audio' &&
                                    <AudioMessage
                                        onOpen={this.props.onOpen}
                                        onDownload={this.props.onDownload}
                                        onLoad={this.props.onLoad}
                                        data={this.props.data}
                                        text={this.props.text} />
                                }

                                {this.props.below?<div
                                style={{bottom:'-22px'}}
                                    className={classNames(
                                        'rce-mbox-time',
                                        { 'rce-mbox-time-block': thatAbsoluteTime },
                                        { 'non-copiable': !this.props.copiableDate },
                                    )}
                                    data-text={ dateText}>
                                    {
                                       
                                    }
                                    {
                                        this.props.status &&
                                        <span className='rce-mbox-status'>
                                            {
                                                this.props.status === 'waiting' &&
                                                <MdIosTime />
                                            }

                                            {
                                                this.props.status === 'sent' &&
                                                <MdCheck />
                                            }

                                            {
                                                this.props.status === 'received' &&
                                                <IoDoneAll />
                                            }

                                            {
                                                this.props.status === 'read' &&
                                                <IoDoneAll color='#4FC3F7'/>
                                            }
                                        </span>
                                    }
                                </div>:null}
                            </div>

                            {
                                this.props.notch &&
                                (this.props.position === 'right' ?
                                    <svg className={classNames(
                                        "rce-mbox-right-notch",
                                        { 'message-focus': this.props.focus},
                                    )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M0 0v20L20 0" />
                                    </svg>
                                    :
                                    <div>
                                        <svg className={classNames(
                                                "rce-mbox-left-notch",
                                                { 'message-focus': this.props.focus},
                                            )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <defs>
                                                <filter id="filter1" x="0" y="0">
                                                    <feOffset result="offOut" in="SourceAlpha" dx="-2" dy="-5" />
                                                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
                                                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                                                </filter>
                                            </defs>
                                            <path d="M20 0v20L0 0" filter="url(#filter1)" />
                                        </svg>
                                    </div>
                                )
                            }
                        </div>
                }
            </div>
        );
    }
}

MessageBox.defaultProps = {
    below:false,
    position: 'left',
    type: 'text',
    text: '',
    title: null,
    titleColor: null,
    onTitleClick: null,
    onForwardClick: null,
    onReplyClick: null,
    onRemoveMessageClick: null,
    onReplyMessageClick: null,
    date: new Date(),
    data: {},
    onClick: null,
    onOpen: null,
    onDownload: null,
    onLoad: null,
    onPhotoError: null,
    forwarded: false,
    reply: false,
    status: null,
    dateString: null,
    notch: true,
    avatar: null,
    renderAddCmp: null,
    copiableDate: false,
    onContextMenu: null,
    focus: false,
    onMessageFocused: null,
    style:{background:'red'}
};


export default MessageBox;
