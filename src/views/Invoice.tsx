import {
    Box,
    ContextView,
    Button,
    TextField,
    Img,
    Banner,
  } from "@stripe/ui-extension-sdk/ui";
  
  import { useState } from 'react';
  import QRCode from 'qrcode';
  
  const Invoice = () => {
    const [url, setUrl] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [error, setError] = useState('');
  
  
    const generateQRCode = async () => {
      try {
        if (!url) {
          setError("Please enter a URL.");
          return;
        }
  
        const urlPattern = new RegExp(
          '^(https?:\\/\\/)?' +
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
          '((\\d{1,3}\\.){3}\\d{1,3}))' +
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
          '(\\?[;&a-z\\d%_.~+=-]*)?' +
          '(\\#[-a-z\\d_]*)?', 'i'
        );
  
        if (!urlPattern.test(url)) {
          setError("Please enter a valid URL (e.g., https://example.com)");
          return;
        }
  
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
          width: 200,
          margin: 2,
        });
        setQrCode(qrCodeDataUrl);
        setError('');
      } catch (error) {
        console.error("Error generating QR code", error);
        setError("Failed to generate QR Code. Please try again.");
      }
    };
  
    return (
      <ContextView
        title="URL QR Code Generator"
        brandColor="#635bff"
        externalLink={{
          label: "Stripe Docs",
          href: "https://stripe.com/docs",
        }}
      >
        <Box css={{ stack: "y", rowGap: "large", padding: "medium" }}>
          <Box css={{ font: "heading", marginBottom: "medium" }}>
            Generate User Payment QR Code
          </Box>
  
          <TextField
            label="Enter URL"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
          />
  
          {error && (
            <Banner
              type="critical"
              title="Error"
              description={error}
            />
          )}
  
          <Button
            type="primary"
            onPress={() => generateQRCode()}
            disabled={!url}
          >
            Generate QR Code
          </Button>
  
          {qrCode && (
            <Box css={{
              stack: "y",
              rowGap: "medium",
              alignSelfY: "center",
              marginTop: "large"
            }}>
              <Box css={{ font: "heading" }}>Your QR Code</Box>
              <Img
                src={qrCode}
                alt="Generated QR Code"
  
              />
              <Button
                type="secondary"
                onPress={() => {
                  window.open(qrCode, '_blank');
                }}
              >
                Download QR Code
              </Button>
            </Box>
          )}
        </Box>
      </ContextView>
    );
  };
  
  export default Invoice;