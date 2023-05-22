import { FC, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import { resolveLang } from '../../helpers/resolveLang';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';

interface OnChangeHandler {
  (e: any): void;
}

interface UnprivilegedEditor {
  getLength(): number;
  getText(index?: number, length?: number): string;
  getHTML(): string;
  getContents(index?: number, length?: number): any;
}

interface IProps {
  value?: string;
  onChange?: OnChangeHandler;
  id?: string;
  disabled?: boolean;
}

export const TextEditor: FC<IProps> = ({ value, onChange, id, disabled }) => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div className='flex justify-center'>
          <Spin size='large' />
        </div>
      )}
      <Editor
        disabled={disabled && disabled}
        id={id && id}
        apiKey='ogv30vxgsh24nlq65ve2mc192p4u9pc8dixvuyk1o07hh7z2'
        onInit={() => {
          setLoading(false);
        }}
        init={{
          height: 500,
          menubar: true,
          directionality: resolveLang(locale, 'rtl', 'ltr'),
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'charmap',
            'searchreplace',
            'fullscreen',
            'insertdatetime',
            'table',
            'help',
            'preview',
            'directionality',
          ],
          toolbar:
            // eslint-disable-next-line max-len
            'undo redo | blocks | fontselect | fontfamily fontsize | textcolor |' +
            // eslint-disable-next-line max-len
            'bold italic underline strikethrough |  forecolor backcolor | alignleft aligncenter |' +
            'alignright alignjustify | outdent indent rtl ltr| ' +
            'link table |' +
            'removeformat preview',
          font_family_formats:
            // eslint-disable-next-line max-len
            'NCA=DinNextArabic; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
          automatic_uploads: true,
          toolbar_persist: true,
          content_style: `@font-face {
            font-family: Nca-medium;
            src: url(./fonts/DINNEXTARABIC-MEDIUM.otf);
        }
        
        body {
          font-family: DinNextArabic, Galano, GESSTwo, sans-serif;
        }
        
        .custom-card {
          padding: '1rem',
                border-radius: '8px',
                border: 'solid 1px RGB(229, 234, 244)',
                background-color: 'RGB(255,255,255)',
                box-shadow: '0px 6px 10px RGBA(0, 0, 0, 0.03)'
        }
        
        `,
          style_formats: [
            {
              title: 'Main Heading 1',
              inline: 'span',
              styles: {
                color: '#fff',
                backgroundColor: 'rgb(0, 185, 173)',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '1.5rem',
                padding: '0px 2rem 5px',
                display: 'inline-block',
              },
            },
            {
              title: 'Main Heading 2',
              inline: 'span',
              styles: {
                color: '#fff',
                backgroundColor: 'rgb(45, 57, 130)',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '1.5rem',
                padding: '0px 2rem 5px',
                display: 'inline-block',
              },
            },
            {
              title: 'Main Heading 3',
              inline: 'span',
              styles: {
                display: 'inline-block',
                color: 'rgb(45, 57, 130)',
                padding: ' 0 0.8rem 0.8rem',
                borderBottom: '2px solid rgb(0, 185, 173)',
              },
            },
            {
              title: 'Responsive Table',
              selector: 'table',
              classes: 'responsive-table',
            },

            {
              title: 'Heading 1',
              inline: 'span',
              styles: {
                color: 'RGB(24, 59, 86)',
                fontWeight: '500',
                fontSize: '1.5rem',
                display: 'inline-block',
              },
            },

            {
              title: 'Custom Card',
              block: 'div',
              wrapper: true,
              classes: 'custom-card',
              styles: {
                padding: '1rem',
                borderRadius: '8px',
                border: 'solid 1px RGB(229, 234, 244)',
                backgroundColor: 'RGB(255,255,255)',
                boxShadow: '0px 6px 10px RGBA(0, 0, 0, 0.03)',
              },
            },

            {
              title: 'Button fill',
              inline: 'span',
              wrapper: true,
              classes: 'custom-button-fill',
              styles: {
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: 'RGB(33, 178, 168)',
                color: 'RGB(255, 255, 255)',
                boxShadow: '0px 5px 14px RGB(215, 217, 217)',
              },
            },
            {
              title: 'Button outline',
              inline: 'span',
              wrapper: true,
              classes: 'custom-button-outline',
              styles: {
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                border: 'solid 1px RGB(33, 178, 168)',
                backgroundColor: 'RGB(255, 255, 255)',
                color: 'RGB(33, 178, 168)',
              },
            },
          ],
        }}
        value={value || ''}
        onEditorChange={onChange}
      />
    </>
  );
};
