import java.sql.*;

public class JDBC {
    public static void main(String args[]) {
        try {
            selectStatements("SELECT * FROM public.\"user\";");
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    private static Connection getDBConnection() {
        Connection dbConnection = null;
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println(e.getMessage());
        }
        try {
            dbConnection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/player_database", "postgres", "admin");
            return dbConnection;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return dbConnection;
    }

    public static void addStatement(String sqlString) throws SQLException {
        Connection connection = null;
        Statement statement = null;
        try {
            connection = getDBConnection();
            statement = connection.createStatement();
            statement.executeUpdate(sqlString);
            System.out.println("CREATED!");
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            if (statement != null) {
                statement.close();
            }
            if (connection != null) {
                connection.close();
            }
        }
    }

    public static void selectStatements(String sqlString) throws SQLException {
        Connection connection = null;
        Statement statement = null;
        try {
            connection = getDBConnection();
            statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(sqlString);
            while (resultSet.next()) {
                System.out.println("id : " + resultSet.getString("id"));
                System.out.println("login : " + resultSet.getString("login"));
                System.out.println("password : " + resultSet.getString("password"));
                System.out.println("email : " + resultSet.getString("email"));
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            if (statement != null) {
                statement.close();
            }
            if (connection != null) {
                connection.close();
            }
        }
    }

    public static void deleteStatement(String sqlString) throws SQLException {
        Connection connection = null;
        Statement statement = null;
        try {
            connection = getDBConnection();
            statement = connection.createStatement();
            statement.executeUpdate(sqlString);
            System.out.println("DELETED!");
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            if (statement != null) {
                statement.close();
            }
            if (connection != null) {
                connection.close();
            }
        }
    }
}
