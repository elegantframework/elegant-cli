import { Image as BaseImage } from '@tiptap/extension-image';

export const Image = BaseImage.extend({
  group: 'block',
  renderHTML({ HTMLAttributes }) {
    return [
       'div',
      {class: "my-8 shadow-xl"},
      [
        'img',
        {
          class: "rounded-xl",
          ...HTMLAttributes
        }
      ]
    ]
  }
}).configure({ inline: true });

export default Image;
