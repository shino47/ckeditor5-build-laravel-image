# ckeditor5-build-laravel-image

[![npm version](https://badge.fury.io/js/ckeditor5-build-laravel-image.svg)](https://badge.fury.io/js/ckeditor5-build-laravel-image)

Custom CKEditor 5 Classic build with support for uploading images to a Laravel endpoint. It provides
the configurations needed by Laravel for CSRF protection.

This build is based on [ckeditor5-build-classic](https://github.com/ckeditor/ckeditor5-build-classic)
and uses the [ckeditor5-simple-upload](https://github.com/pourquoi/ckeditor5-simple-upload) plugin
to upload the images to the Laravel application.

Laravel has a [CSRF protection](https://laravel.com/docs/master/csrf), so you have to send a CSRF
token or add an exception to the `VerifyCsrfToken` middleware (not recommended).

## Installation

```shell
npm i ckeditor5-build-laravel-image
```

## Usage

First, you have to set your token in a meta tag:

```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```

Then, you can create an instance of the editor:

```javascript
ClassicEditor.create(document.querySelector('#editor'), {
  simpleUpload: {
    uploadUrl: {
      url: 'http://localhost:9000/my-laravel-endpoint'
    }
  }
}).then(editor => {
  console.log('Editor created successfully!');
}).catch(err => {
  console.error(err.stack);
});
```

Where `simpleUpload.uploadUrl.url` is the URL of your Laravel endpoint that manages the image
upload.

### Laravel endpoint

The endpoint requirements are the same as the
[ckeditor5-simple-upload](https://github.com/pourquoi/ckeditor5-simple-upload) plugin.

The endpoint will expect a file called `upload` and should return a response depending of the
status.

#### Success response

```json
{
  "uploaded": true,
  "url": "http://127.0.0.1/uploaded-image.jpeg"
}
```

#### Failure response

```json
{
  "uploaded": false,
  "error": {
      "message": "could not upload this image"
  }
}
```

## Features

This build includes almost the same as
[ckeditor5-build-classic](https://github.com/ckeditor/ckeditor5-build-classic), but with the
following differences.

Removed:
- [UploadAdapter](https://github.com/ckeditor/ckeditor5-adapter-ckfinder)
- [CKFinder](https://github.com/ckeditor/ckeditor5-ckfinder)
- [EasyImage](https://github.com/ckeditor/ckeditor5-easy-image)

Added the following features:
- [Block indentation](https://ckeditor.com/docs/ckeditor5/latest/features/indent.html)
- [Text alignment](https://ckeditor.com/docs/ckeditor5/latest/features/text-alignment.html)

Added from the
[Basic text styles](https://ckeditor.com/docs/ckeditor5/latest/features/basic-styles.html) feature:
- Underline
- Strikethrough
- Subscript
- Superscript
- Code
