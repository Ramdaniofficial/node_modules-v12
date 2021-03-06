/* Macros for the header version.
 */

#ifndef VIPS_VERSION_H
#define VIPS_VERSION_H

#define VIPS_VERSION		"8.10.6"
#define VIPS_VERSION_STRING	"8.10.6-Tue Mar 23 20:52:58 UTC 2021"
#define VIPS_MAJOR_VERSION	(8)
#define VIPS_MINOR_VERSION	(10)
#define VIPS_MICRO_VERSION	(6)

/* The ABI version, as used for library versioning.
 */
#define VIPS_LIBRARY_CURRENT	(54)
#define VIPS_LIBRARY_REVISION	(7)
#define VIPS_LIBRARY_AGE	(12)

#define VIPS_CONFIG		"native win32: yes, native OS X: no, open files in binary mode: yes, enable debug: no, enable deprecated library components: no, enable docs with gtkdoc: no, gobject introspection: no, enable radiance support: no, enable analyze support: no, enable PPM support: no, use fftw3 for FFT: no, Magick package: none, Magick API version: none, load with libMagick: no, save with libMagick: no, accelerate loops with orc: yes, ICC profile support with lcms: yes (lcms2), file import with niftiio: no, file import with libheif: yes, file import with OpenEXR: no, file import with OpenSlide: no, file import with matio: no, PDF import with PDFium: no, PDF import with poppler-glib: no, SVG import with librsvg-2.0: yes, zlib: yes (found by search), file import with cfitsio: no, file import/export with libwebp: yes, text rendering with pangoft2: yes, file import/export with libspng: yes, file import/export with libpng: yes (pkg-config libpng >= 1.2.9), support 8bpp PNG quantisation: yes, file import/export with libtiff: yes (pkg-config libtiff-4), file import/export with giflib: yes (found by search), file import/export with libjpeg: yes (pkg-config), image pyramid export: yes, use libexif to load/save JPEG metadata: yes"

/** 
 * VIPS_SONAME:
 *
 * The name of the shared object containing the vips library, for example
 * "libvips.so.42", or "libvips-42.dll".
 */

#include "soname.h"

/* Not really anything to do with versions, but this is a handy place to put
 * it.
 */
#define VIPS_EXEEXT ".exe"
#define VIPS_ENABLE_DEPRECATED 0

#endif /*VIPS_VERSION_H*/
