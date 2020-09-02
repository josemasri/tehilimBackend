"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mailer_1 = require("@nestjs-modules/mailer");
var pug_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/pug.adapter");
var mongoose_1 = require("@nestjs/mongoose");
var dotenv = require("dotenv");
var tehilim_module_1 = require("./tehilim/tehilim.module");
dotenv.config();
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true,
                    autoIndex: true
                }),
                mailer_1.MailerModule.forRoot({
                    transport: "smtps://" + process.env.MAILER_EMAIL + ":" + process.env.MAILER_PASS + "@smtp.gmail.com",
                    defaults: {
                        from: "\"Maraton de Tehilim\" <" + process.env.MAILER_EMAIL + ">"
                    },
                    template: {
                        dir: __dirname + '/../templates',
                        adapter: new pug_adapter_1.PugAdapter(),
                        options: {
                            strict: true
                        }
                    }
                }),
                tehilim_module_1.TehilimModule,
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
