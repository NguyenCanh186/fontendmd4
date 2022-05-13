function showAllSupplier(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/koibito/listSupplier",
        success: function (supplier){
            let service = [];
            let content = "";
            let ct = "";
            for (let i = 0; i < supplier.length; i++) {
                let arr = Array.from(supplier[i].serviceSet)
                service.push(arr);
                content+=`<tr>
        <td><img src="${'http://localhost:8080/image/' + supplier[i].image}" width="100px"></td>
        <td>${supplier[i].name}</td>
        <td>${supplier[i].age}</td>
        <td>${supplier[i].height + " cm"}</td>
        <td>${supplier[i].weight + " kg"}</td>
        <td id="${supplier[i].id}"></td>
        <td><button class="btn btn-primary" onclick="deleteBook(${supplier[i].id})" >Add to cart</button></td>
        <td><button class="btn btn-primary" onclick="showInformation(${supplier[i].id})">View</button></td>
    </tr>`

            }

            $("#list-supplier").html(content);
        }
    })
}
showAllSupplier();

function showAddress(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/koibito/address",
        success: function (address){
            let content = "";
            for (let i = 0; i < address.length; i++) {
                content +=`<option value="${address[i].id}">${address[i].address}</option>`
            }
            $("#address").html(content);

        }
    })
}
showAddress()



function showAllService(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/koibito/service",
        success: function (service){
            let content = "";
            for (let i = 0; i < service.length; i++) {
                content +=`<option value="${service[i].id}">${service[i].name}</option>`
            }
            $("#service").html(content);

        }
    })
}
showAllService()

function showAllGender(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/koibito/gender",
        success: function (gender){
            let content = "";
            for (let i = 0; i < gender.length; i++) {
                content +=`<option value="${gender[i].id}">${gender[i].gender}</option>`
            }
            $("#gender").html(content);

        }
    })
}
showAllGender()

function showAllStatus(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/koibito/status",
        success: function (status){
            let content = "";
            let tt1 = "";
            let tt2 = "";
            for (let i = 0; i < status.length; i++) {
                if (status[0].status = true){
                    tt1 = "ready"
                }
                if (status[1].status = true){
                    tt2 = "busy"
                }
            }
            content =`<option value="${status[0].id}">${tt1}</option>
                      <option value="${status[1].id}">${tt2}</option>`
            $("#status").html(content);

        }
    })
}
showAllStatus()
function showInformation(){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/koibito/findOneSupplier/1`,
        success:function (supplier){
            $('#name1').val(supplier.name)
            $('#email1').val(supplier.email)
            $('#gender1').val(supplier.gender)
            $('#hobby1').val(supplier.hobby)
            $('#personal1').val(supplier.personal)
            $('#note1').val(supplier.note)
            $('#height1').val(supplier.height)
            $('#weight1').val(supplier.weight)
            $('#phone1').val(supplier.phone)
            $('#age1').val(supplier.age)
            $('#address1').val(supplier.address)
            $('#service1').val(supplier.serviceSet)
            $('#status1').val(supplier.status)
            let img = `<img src="http://localhost:8080/image/${supplier.image}">`
            $(`#showImg`).html(img)
        }
    })
}
showInformation()
function addNewSupplier() {
    //lay du lieu
    let name = $('#name').val();
    let email = $('#email').val();
    let gender = $('#gender').val();
    let hobby = $('#hobby').val();
    let personal = $('#personal').val();
    let note = $('#note').val();
    let height = $('#height').val();
    let weight = $('#weight').val();
    let phone = $('#phone').val();
    let age = $('#age').val();
    let address = $('#address').val();
    let service = $('#service').val();
    let status = $('#status').val();
    let image = $('#image');
    let supplier = new FormData();
    supplier.append('name', name);
    supplier.append('age', age);
    supplier.append('gender', gender);
    supplier.append('email', email);
    supplier.append('hobby', hobby);
    supplier.append('personal', personal);
    supplier.append('note', note);
    supplier.append('height', height);
    supplier.append('weight', weight);
    supplier.append('phone', phone);
    supplier.append('address', address);
    supplier.append('serviceSet', service);
    supplier.append('status', status);
    supplier.append('image', image.prop('files')[0]);

    $.ajax({
        type:'POST',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: supplier,
        url: 'http://localhost:8080/koibito/create',
        success: showAllSupplier
    });
    // event.preventDefault();
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var big_image;

$(document).ready(function() {
    BrowserDetect.init();
    $('body').bootstrapMaterialDesign();
    window_width = $(window).width();
    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;
    $navbar_collapse = $('.navbar').find('.navbar-collapse');
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    if ($('.navbar-color-on-scroll').length != 0) {
        $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);
    }
    materialKit.checkScrollForTransparentNavbar();
    if (window_width >= 768) {
        big_image = $('.page-header[data-parallax="true"]');
        if (big_image.length != 0) {
            $(window).on('scroll', materialKit.checkScrollForParallax);
        }
    }
});

$(document).on('click', '.navbar-toggler', function() {
    $toggle = $(this);

    if (materialKit.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        materialKit.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function() {
            $toggle.removeClass('toggled');
        }, 550);

        $('html').removeClass('nav-open-absolute');
    } else {
        setTimeout(function() {
            $toggle.addClass('toggled');
        }, 580);


        div = '<div id="bodyClick"></div>';
        $(div).appendTo("body").click(function() {
            $('html').removeClass('nav-open');

            if ($('nav').hasClass('navbar-absolute')) {
                $('html').removeClass('nav-open-absolute');
            }
            materialKit.misc.navbar_menu_visible = 0;
            $('#bodyClick').remove();
            setTimeout(function() {
                $toggle.removeClass('toggled');
            }, 550);
        });

        if ($('nav').hasClass('navbar-absolute')) {
            $('html').addClass('nav-open-absolute');
        }

        $('html').addClass('nav-open');
        materialKit.misc.navbar_menu_visible = 1;
    }
});

materialKit = {
    misc: {
        navbar_menu_visible: 0,
        window_width: 0,
        transparent: true,
        fixedTop: false,
        navbar_initialized: false,
        isWindow: document.documentMode || /Edge/.test(navigator.userAgent)
    },


    checkScrollForParallax: function() {
        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform': 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
        });
    },

    checkScrollForTransparentNavbar: debounce(function() {
        if ($(document).scrollTop() > scroll_distance) {
            if (materialKit.misc.transparent) {
                materialKit.misc.transparent = false;
                $('.navbar-color-on-scroll').removeClass('navbar-transparent');
            }
        } else {
            if (!materialKit.misc.transparent) {
                materialKit.misc.transparent = true;
                $('.navbar-color-on-scroll').addClass('navbar-transparent');
            }
        }
    }, 17)
};
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};

var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer"
        },
        {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "Explorer"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.userAgent,
            subString: "Safari",
            identity: "Safari"
        },
        {
            string: navigator.userAgent,
            subString: "Opera",
            identity: "Opera"
        }
    ]

};


