/**
 * @file  fontmin svgs2ttf
 * @author junmer
 */

/* eslint-env node */
/* global before */

var assert = require('chai').assert;

var fs = require('fs');
var path = require('path');
var clean = require('gulp-clean');
var isTtf = require('is-ttf');
var Fontmin = require('../index');

var srcPath = path.resolve(__dirname, '../fonts/svg/*.svg');
var destPath = path.resolve(__dirname, '../fonts/dest_svgs');
var destFile = destPath + '/iconfont';


function getFile(files, ext) {
    var re = new RegExp(ext + '$');
    var vf = files.filter(function (file) {
        return re.test(file.path);
    });
    return vf[0];
}

var outputFiles;

before(function (done) {

    // clean
    new Fontmin()
        .src(destPath)
        .use(clean())
        .run(next);



    // minfy
    var fontmin = new Fontmin()
        .src(srcPath)
        .use(Fontmin.svgs2ttf('iconfont.ttf'))
        .use(Fontmin.ttf2svg())
        .use(Fontmin.css({
            glyph: true
        }))
        .dest(destPath);

    function next() {
        fontmin.run(function (err, files, stream) {

            if (err) {
                console.log(err);
                process.exit(-1);
            }

            outputFiles = files;

            done();
        });
    }

});


describe('svgs2ttf plugin', function () {

    it('output buffer should be ttf', function () {
        assert(isTtf(getFile(outputFiles, 'ttf').contents));
    });

    it('dest file should exist ttf', function () {
        assert(
            fs.existsSync(destFile + '.ttf')
        );
    });

    it('dest file should be ttf', function () {
        try {
            assert(
                isTtf(
                    fs.readFileSync(destFile + '.ttf')
                )
            );
        }
        catch (ex) {
            assert(false);
        }
    });

});
