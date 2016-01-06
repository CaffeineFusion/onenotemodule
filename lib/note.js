/*
* Started adding shells for new functions (note: just thinking out loud atm)
* Note: Microsoft's Sample for Node is a bunch of static functions which don't take any input, need to fix this up.
*
* Started refactoring to convert to prime Note object.
* Culled useless example functions
* Promoted createPage() to public
* added getPage() and getSection()
*
* Todo:
*  - Build tests
*  - Create Update/Delete/View functionality
*  - See if Creation logic needs updating
*  - Create helper objects/functions
*
* Should I implement notebook level functionality?
*/


var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

var Note = function () {
    var oneNotePagesApiUrl = 'https://www.onenote.com/api/v1.0/pages';


    /**
     * Create OneNote Page
     *
     * @param {string} accessToken The access token
     * @param {string or JSON object} payLoad A single part (string) or multipart (JSON object) object containing page content and formats
     * @param {createPageCallback} callback The callback with response data
     * @param {boolean} ismultipart Whether to iterate over a JSON object or handle a single input string

     * Example of passing in both html content post and a local file
     * createPage(accessToken, {
     *   'Presentation': {
     *      body: htmlPayload,
     *      contentType: 'text/html'
     *   },
     *   'EmbeddedFile': {
     *      body: fs.readFileSync(path.normalize(__dirname + '/../file.pdf')),
     *      contentType: 'application/pdf'
     *   }
     * }, callback, true);
     */

    this.createPage = function(accessToken, payload, callback, ismultipart) {
        var options = {
            url: oneNotePagesApiUrl,
            headers: {'Authorization': 'Bearer ' + accessToken}
        };
        // Build simple request
        if (!multipart) {
            options.headers['Content-Type'] = 'text/html';
            options.body = payload;
        }
        var r = request.post(options, callback);
        // Build multi-part request
        if (ismultipart) {
            var CRLF = '\r\n';
            var form = r.form(); // FormData instance
            _.each(payload, function (partData, partId) {
                form.append(partId, partData.body, {
                    // Use custom multi-part header
                    header: CRLF +
                        '--' + form.getBoundary() + CRLF +
                        'Content-Disposition: form-data; name=\"' + partId + '\"' + CRLF +
                        'Content-Type: ' + partData.contentType + CRLF + CRLF
                });
            });
        }
    };


    /* Get Page based on PageId */
    this.getPage = function (accessToken, pageId, callback) {
        var options = {
            url: oneNotePagesApiUrl + "pages/" + pageId,
            headers: {'Authorization': 'Bearer ' + accessToken}
        };
        options.headers['Content-Type'] = 'text/html';
        options.body = payload;

        throw new Error("getPage() has not been implemented yet");

        /* Note to self - check request.get syntax */
        var r = request.get(options, callback);//post(options, callback);
       
    };

    /* Get Section based on SectionID */
    this.getSection = function (accessToken, sectionId, callback) {
        var options = {
            url: oneNotePagesApiUrl + "sections/" + sectionId,
            headers: {'Authorization': 'Bearer ' + accessToken}
        };
        options.headers['Content-Type'] = 'text/html';
        options.body = payload;


        throw new Error("getSection() has not been implemented yet");

        var r = request.get(options, callback);//post(options, callback);
       
    };



    function dateTimeNowISO() {
        return new Date().toISOString();
    }


};
module.exports = new Note();
