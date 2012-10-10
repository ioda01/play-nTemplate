package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends MultiTemplateController {

	@Before
	protected static void before() {
//		registerTemplate("template1", "templates/template1.html");
//		registerTemplate("template2", "templates/template2.html");
//		registerTemplate("template3", "templates/template3.html");
//		registerTemplate("template4", "templates/template4.html");
//		registerTemplate("template5", "templates/template5.html");
	}
	
    public static void index() {
    	System.out.println(Play.configuration.get("some.url"));
    	String arg1 = (String) request.params.get("arg1");
    	String arg2 = (String) request.params.get("arg2");
        render(arg1, arg2);
    }

    public static void testMultiRender() {
    	model.put("arg1", (String) request.params.get("arg1"));
    	model.put("arg2", (String) request.params.get("arg2"));
    	String templates = (String) request.params.get("templates");
    	if (templates != null && !templates.isEmpty()) {
    		renderNTemplates(model, templates.split(","));
    	}
    	index();
    }
}