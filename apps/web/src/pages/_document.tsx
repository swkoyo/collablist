import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html className='h-full bg-zinc-950 text-white'>
        <Head />
        <body className='h-full'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
