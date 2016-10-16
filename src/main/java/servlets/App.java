package servlets;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Enumeration;

public class App {

    public static final Logger LOG = Logger.getLogger(App.class.getClass());

    public static void main(String[] args) throws FileNotFoundException, IOException {
        String nameFile = "log4j.properties";
        PropertyConfigurator.configure(nameFile);
        Logger LOG = Logger.getRootLogger();
        Logger localLog2 = Logger.getLogger("logfile");
        Enumeration append = LOG.getAllAppenders();
        while (append.hasMoreElements()) {
            LOG.info("Available appender " + append.nextElement());
        }
        LOG.info("Hi Logger info!");
        localLog2.warn("logfile write!");
        System.out.println("LOG.equals(localLog) is " + LOG.equals(localLog2));
    }

}
