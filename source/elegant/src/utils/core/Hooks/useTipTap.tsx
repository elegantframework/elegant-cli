import CodeBlock from '@/components/core/CodeBlock';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Youtube from '@tiptap/extension-youtube';
import { Editor, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { lowlight } from 'lowlight/lib/common';
import { mergeAttributes } from '@tiptap/core';
import { getEmbedUrlFromYoutubeUrl } from '../YouTube/GetEmbedUrlFromYouTubeUrl';

const useTipTap = ({ ...rhfMethods }) => {
  const { setValue, trigger } = rhfMethods

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false
      }),
      Image.extend({
        renderHTML({ HTMLAttributes }) {
          return [
            'img',
            {
              ...HTMLAttributes,
              onError:
                'this.classList.add("image-error");this.alt="Couldn\'t load image.";'
            }
          ]
        }
      }).configure({ inline: true }),
      Placeholder.configure({
        placeholder: "What's your story?",
        showOnlyWhenEditable: false
      }),
      Link.configure({ openOnClick: false }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock)
        }
      }).configure({
        lowlight
      }),
      Youtube.extend({
        renderHTML({ HTMLAttributes }) {
          const embedUrl = getEmbedUrlFromYoutubeUrl({
            url: HTMLAttributes.src,
            allowFullscreen: this.options.allowFullscreen,
            autoplay: this.options.autoplay,
            ccLanguage: this.options.ccLanguage,
            ccLoadPolicy: this.options.ccLoadPolicy,
            controls: this.options.controls,
            disableKBcontrols: this.options.disableKBcontrols,
            enableIFrameApi: this.options.enableIFrameApi,
            endTime: this.options.endTime,
            interfaceLanguage: this.options.interfaceLanguage,
            ivLoadPolicy: this.options.ivLoadPolicy,
            loop: this.options.loop,
            modestBranding: this.options.modestBranding,
            nocookie: this.options.nocookie,
            origin: this.options.origin,
            playlist: this.options.playlist,
            progressBarColor: this.options.progressBarColor,
            startAt: HTMLAttributes.start || 0,
          })
      
          HTMLAttributes.src = embedUrl;

          // set our seo objects if the data exists
          let videoSchema = [];

          //@todo: if title and description, add schema below to object and return it
      
          return [
            'div',
            { 'data-youtube-video': '' },
            [
              'script', {
                type: 'application/ld+json'
              },
              '{"@context":"https://schema.org","@type":"VideoObject","name":"How to get started with Elegant.","description":"A detailed guide on how to get started with Elegant.","contentUrl":"https://youtu.be/bS66QUBKljM","embedUrl":"https://www.youtube.com/embed/bS66QUBKljM","uploadDate":"2023-05-29T08:00:00+08:00","thumbnailUrl":["https://img.youtube.com/vi/bS66QUBKljM/0.jpg"]}'
            ],
            [
              'iframe',
              mergeAttributes(
                this.options.HTMLAttributes,
                {
                  width: this.options.width,
                  height: this.options.height,
                  allowfullscreen: this.options.allowFullscreen,
                  autoplay: this.options.autoplay,
                  ccLanguage: this.options.ccLanguage,
                  ccLoadPolicy: this.options.ccLoadPolicy,
                  disableKBcontrols: this.options.disableKBcontrols,
                  enableIFrameApi: this.options.enableIFrameApi,
                  endTime: this.options.endTime,
                  interfaceLanguage: this.options.interfaceLanguage,
                  ivLoadPolicy: this.options.ivLoadPolicy,
                  loop: this.options.loop,
                  modestBranding: this.options.modestBranding,
                  origin: this.options.origin,
                  playlist: this.options.playlist,
                  progressBarColor: this.options.progressBarColor,
                },
                HTMLAttributes,
              ),
            ]
          ]
        },
      })
    ],
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
    onUpdate({ editor }) {
      const val = editor.getHTML()
      setValue('content', val && !editor.isEmpty ? val : '')
      ;(async () => await trigger('content'))()
    }
  })

  return { editor: editor as Editor }
}

export default useTipTap
