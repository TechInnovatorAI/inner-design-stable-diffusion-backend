import { UserEntity } from 'src/users/entities/user.entity';
import { SENDGRID_HOST_MAIL } from 'src/environments';

export const sendTestMail = (
  userInfo: UserEntity,
  url: string,
): Promise<boolean> => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: userInfo.email, // Change to your recipient
    from: SENDGRID_HOST_MAIL, // Change to your verified sender
    subject: '【Showcase;インテリアAIサービス】ご本人様確認',
    text: '下のリンクをクリックしてサービスにログインしてください。',
    html: `<h4>このたびは、”Showcase;AIサービス”にご登録いただきまして
    まことにありがとうございます。</h4>
    <h4>以下の”確認ボタン”をクリックして、ご本人様確認にご協力ください。</h4>
    <div style="margin: 0px 100px">
  <a href="${url}" style="margin: auto; background-color: #666cff; padding: 10px 40px; border-radius: 5px; color: white; text-decoration: none; ">確認する</a>
    </div> 
  <h4>このメールに見覚えがない、当サービスにご登録されていない場合は
  お手数ですが、以下のアドレスまでご報告ください。</h4>
    <a style="text-decoration: none;" href="mailto:info@findshowcase.com">~~~~~~~~~~~~~~~~~info@findshowcase.com~~~~~~~~~~~~~~~~~</a>`,
  };

  return sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);

      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};
